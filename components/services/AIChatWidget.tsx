"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export function AIChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Hi! I\'m the Nereid AI assistant. Tell me about your project idea, and I\'ll help you understand what services you need and provide a rough quote estimate.',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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

            const data = await response.json();

            let aiContent = '';
            if (data.success && data.estimate) {
                const est = data.estimate;
                aiContent = `${data.message}\n\n**Service:** ${est.service}\n**Complexity:** ${est.complexity}\n**Timeline:** ${est.timeline}\n**Price Range:** $${est.price.min.toLocaleString()} - $${est.price.max.toLocaleString()}\n\n**Key Features:**\n${est.features.map((f: string) => `• ${f}`).join('\n')}\n\nWould you like to schedule a consultation to discuss this in detail?`;
            } else {
                aiContent = "I'd love to help you get a quote! Could you tell me more about what you're trying to build? For example: Is it a website, mobile app, network setup, or something else?";
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
                content: 'Sorry, I\'m having trouble generating a quote right now. Please try again or contact us directly for assistance.',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            {/* Chat Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(0, 212, 170, 0.3)',
                    zIndex: 1000,
                }}
                aria-label="Open AI chat assistant"
            >
                <MessageCircle size={24} color="white" />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        style={{
                            position: 'fixed',
                            bottom: '88px',
                            right: '24px',
                            width: 'min(380px, calc(100vw - 32px))',
                            height: 'min(500px, calc(100vh - 120px))',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border)',
                            borderRadius: '16px',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
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
                                <div
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        background: 'var(--accent)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Bot size={16} color="white" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                                        Nereid AI Assistant
                                    </h3>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                                        Get instant quotes & advice
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '4px',
                                    borderRadius: '4px',
                                    color: 'var(--text-muted)',
                                }}
                                aria-label="Close chat"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div
                            style={{
                                flex: 1,
                                padding: '16px',
                                overflowY: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                            }}
                        >
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    style={{
                                        display: 'flex',
                                        gap: '8px',
                                        alignItems: message.role === 'user' ? 'flex-end' : 'flex-start',
                                    }}
                                >
                                    {message.role === 'assistant' && (
                                        <div
                                            style={{
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '50%',
                                                background: 'var(--accent)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                            }}
                                        >
                                            <Bot size={12} color="white" />
                                        </div>
                                    )}
                                    <div
                                        style={{
                                            maxWidth: '280px',
                                            padding: '10px 14px',
                                            borderRadius: '12px',
                                            background: message.role === 'user' ? 'var(--accent)' : 'var(--bg-surface)',
                                            color: message.role === 'user' ? 'white' : 'var(--text-primary)',
                                            fontSize: '14px',
                                            lineHeight: '1.4',
                                        }}
                                    >
                                        {message.content}
                                    </div>
                                    {message.role === 'user' && (
                                        <div
                                            style={{
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '50%',
                                                background: 'var(--bg-surface)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                            }}
                                        >
                                            <User size={12} />
                                        </div>
                                    )}
                                </div>
                            ))}

                            {isTyping && (
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                    <div
                                        style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            background: 'var(--accent)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                        }}
                                    >
                                        <Bot size={12} color="white" />
                                    </div>
                                    <div
                                        style={{
                                            padding: '10px 14px',
                                            borderRadius: '12px',
                                            background: 'var(--bg-surface)',
                                            fontSize: '14px',
                                        }}
                                    >
                                        <div
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
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Describe your project idea..."
                                style={{
                                    flex: 1,
                                    padding: '10px 14px',
                                    border: '1px solid var(--border)',
                                    borderRadius: '8px',
                                    background: 'var(--bg-primary)',
                                    color: 'var(--text-primary)',
                                    fontSize: '14px',
                                    outline: 'none',
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = 'var(--accent)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'var(--border)';
                                }}
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim() || isTyping}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '8px',
                                    background: inputValue.trim() && !isTyping ? 'var(--accent)' : 'var(--bg-surface)',
                                    border: '1px solid var(--border)',
                                    cursor: inputValue.trim() && !isTyping ? 'pointer' : 'not-allowed',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    opacity: inputValue.trim() && !isTyping ? 1 : 0.5,
                                }}
                                aria-label="Send message"
                            >
                                <Send size={16} color={inputValue.trim() && !isTyping ? 'white' : 'var(--text-muted)'} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}