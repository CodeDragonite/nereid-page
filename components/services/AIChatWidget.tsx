"use client";
import { useState, useRef, useEffect, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { DUR, EASE, popIn } from "@/lib/motion";

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface QuoteEstimate {
    service: string;
    complexity: string;
    timeline: string;
    price: { min: number; max: number };
    features: string[];
}

interface QuoteResponse {
    success?: boolean;
    message?: string;
    estimate?: QuoteEstimate;
}

/** Bottom-anchored panel: grows from the launcher corner. */
const chatPanel = {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1, transition: { duration: DUR.short, ease: EASE.enter } },
    exit: { opacity: 0, scale: 0.96, transition: { duration: DUR.micro, ease: EASE.exit } },
};

const avatarStyle: React.CSSProperties = {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: 'var(--accent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
};

export function AIChatWidget() {
    const t = useTranslations("Chat");
    const [isOpen, setIsOpen] = useState(false);
    // The welcome message is rendered from i18n directly, so it follows the locale.
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const launcherRef = useRef<HTMLButtonElement>(null);
    const wasOpenRef = useRef(false);
    const titleId = useId();
    const panelId = useId();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Focus management: input on open, launcher on close (not on first mount).
    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        } else if (wasOpenRef.current) {
            launcherRef.current?.focus();
        }
        wasOpenRef.current = isOpen;
    }, [isOpen]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        try {
            const response = await fetch('/api/ai-quote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description: userMessage.content }),
            });

            const data = (await response.json()) as QuoteResponse;

            let aiContent = '';
            if (data.success && data.estimate) {
                const est = data.estimate;
                aiContent = `${data.message ?? ''}\n\n**${t("estimateService")}** ${est.service}\n**${t("estimateComplexity")}** ${est.complexity}\n**${t("estimateTimeline")}** ${est.timeline}\n**${t("estimatePrice")}** $${est.price.min.toLocaleString()} - $${est.price.max.toLocaleString()}\n\n**${t("estimateFeatures")}**\n${est.features.map((f) => `• ${f}`).join('\n')}\n\n${t("estimateFollowUp")}`;
            } else {
                aiContent = t("fallback");
            }

            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: aiContent,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiResponse]);
        } catch (error) {
            console.error('Error getting quote:', error);
            const errorResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: t("error"),
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handlePanelKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') {
            e.stopPropagation();
            setIsOpen(false);
        }
    };

    const canSend = inputValue.trim().length > 0 && !isTyping;

    const renderBubble = (message: Pick<Message, 'id' | 'role' | 'content'>) => (
        <div
            key={message.id}
            style={{
                display: 'flex',
                gap: '8px',
                alignItems: message.role === 'user' ? 'flex-end' : 'flex-start',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
            }}
        >
            {message.role === 'assistant' && (
                <div aria-hidden="true" style={avatarStyle}>
                    <Bot size={12} color="var(--on-accent)" />
                </div>
            )}
            <div
                style={{
                    maxWidth: '280px',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: message.role === 'user' ? 'var(--accent)' : 'var(--bg-surface)',
                    color: message.role === 'user' ? 'var(--on-accent)' : 'var(--text-primary)',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    whiteSpace: 'pre-line',
                }}
            >
                {message.content}
            </div>
            {message.role === 'user' && (
                <div aria-hidden="true" style={{ ...avatarStyle, background: 'var(--bg-surface)' }}>
                    <User size={12} color="var(--text-secondary)" />
                </div>
            )}
        </div>
    );

    return (
        <>
            {/* Chat Button — entrance on the wrapper so CSS :hover owns the button transform */}
            <motion.div
                initial={popIn.initial}
                animate={popIn.animate}
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    zIndex: 1000,
                }}
            >
                <button
                    ref={launcherRef}
                    type="button"
                    className="chat-fab"
                    onClick={() => setIsOpen((open) => !open)}
                    aria-expanded={isOpen}
                    aria-controls={isOpen ? panelId : undefined}
                    style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'var(--accent)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 20px var(--accent-glow)',
                    }}
                    aria-label={t("openLabel")}
                >
                    <MessageCircle size={24} color="var(--on-accent)" aria-hidden="true" />
                </button>
            </motion.div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id={panelId}
                        role="dialog"
                        aria-modal="false"
                        aria-labelledby={titleId}
                        onKeyDown={handlePanelKeyDown}
                        initial={chatPanel.initial}
                        animate={chatPanel.animate}
                        exit={chatPanel.exit}
                        style={{
                            position: 'fixed',
                            bottom: '88px',
                            right: '24px',
                            width: 'min(380px, calc(100vw - 32px))',
                            height: 'min(500px, calc(100vh - 120px))',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-lg)',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                            transformOrigin: 'bottom right',
                            zIndex: 1000,
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Header */}
                        <div
                            style={{
                                padding: '16px 20px',
                                borderBottom: '1px solid var(--border)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div aria-hidden="true" style={{ ...avatarStyle, width: '32px', height: '32px' }}>
                                    <Bot size={16} color="var(--on-accent)" />
                                </div>
                                <div>
                                    <h3 id={titleId} style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                                        {t("title")}
                                    </h3>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                                        {t("subtitle")}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="chat-close"
                                onClick={() => setIsOpen(false)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '4px',
                                    borderRadius: 'var(--radius-sm)',
                                    color: 'var(--text-muted)',
                                }}
                                aria-label={t("closeLabel")}
                            >
                                <X size={18} aria-hidden="true" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div
                            role="log"
                            aria-live="polite"
                            aria-label={t("messagesLabel")}
                            style={{
                                flex: 1,
                                padding: '16px',
                                overflowY: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                            }}
                        >
                            {renderBubble({ id: 'welcome', role: 'assistant', content: t("welcome") })}
                            {messages.map(renderBubble)}

                            {/* Typing indicator: the dot animation communicates state, so it stays */}
                            {isTyping && (
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                    <div aria-hidden="true" style={avatarStyle}>
                                        <Bot size={12} color="var(--on-accent)" />
                                    </div>
                                    <div
                                        role="status"
                                        aria-label={t("typing")}
                                        style={{
                                            padding: '10px 14px',
                                            borderRadius: 'var(--radius-md)',
                                            background: 'var(--bg-surface)',
                                            fontSize: '14px',
                                        }}
                                    >
                                        <div
                                            aria-hidden="true"
                                            style={{
                                                display: 'flex',
                                                gap: '6px',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {Array.from({ length: 3 }).map((_, idx) => (
                                                <span
                                                    key={idx}
                                                    style={{
                                                        width: '8px',
                                                        height: '8px',
                                                        borderRadius: '50%',
                                                        background: 'var(--text-muted)',
                                                        opacity: 0.9,
                                                        animation: 'typing-dot 1.2s ease-in-out infinite',
                                                        animationDelay: `${idx * 0.2}s`,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div
                            style={{
                                padding: '16px',
                                borderTop: '1px solid var(--border)',
                                display: 'flex',
                                gap: '8px',
                            }}
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                className="field"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleInputKeyDown}
                                placeholder={t("placeholder")}
                                aria-label={t("inputLabel")}
                                style={{
                                    flex: 1,
                                    minWidth: 0,
                                    padding: '10px 14px',
                                    fontSize: '14px',
                                }}
                            />
                            <button
                                type="button"
                                onClick={handleSendMessage}
                                disabled={!canSend}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    flexShrink: 0,
                                    borderRadius: 'var(--radius-md)',
                                    background: canSend ? 'var(--accent)' : 'var(--bg-surface)',
                                    border: '1px solid var(--border)',
                                    cursor: canSend ? 'pointer' : 'not-allowed',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    opacity: canSend ? 1 : 0.5,
                                    transition: 'background-color var(--dur-micro) var(--ease-standard), opacity var(--dur-micro) var(--ease-standard)',
                                }}
                                aria-label={t("sendLabel")}
                            >
                                <Send size={16} color={canSend ? 'var(--on-accent)' : 'var(--text-muted)'} aria-hidden="true" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Launcher hover/focus feedback lives in CSS so keyboard focus matches hover */}
            <style>{`
                .chat-fab {
                    transition:
                        transform var(--dur-short) var(--ease-enter),
                        box-shadow var(--dur-short) var(--ease-standard);
                }
                .chat-fab:hover,
                .chat-fab:focus-visible {
                    transform: scale(1.05);
                    box-shadow: 0 6px 28px var(--accent-glow) !important;
                }
                .chat-fab:active {
                    transform: scale(0.95);
                }
                .chat-close {
                    transition: color var(--dur-micro) var(--ease-standard);
                }
                .chat-close:hover,
                .chat-close:focus-visible {
                    color: var(--text-primary) !important;
                }
                @media (prefers-reduced-motion: reduce) {
                    .chat-fab:hover,
                    .chat-fab:focus-visible,
                    .chat-fab:active {
                        transform: none;
                    }
                }
            `}</style>
        </>
    );
}
