import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, CheckCircle2, Sparkles } from 'lucide-react';
import { caseStudies } from '@/lib/portfolio';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);

  return {
    title: study ? `${study.title} | Nereid Systems` : 'Case Study | Nereid Systems',
    description: study ? `Explore the ${study.title} case study.` : 'Case study details for Nereid Systems.',
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);

    if (!study) {
        return (
            <div className="min-h-screen bg-background text-foreground">
                <div className="container mx-auto px-4 py-20 text-center">
                    <p className="text-sm text-accent mb-4">Case Study Not Found</p>
                    <h1 className="text-4xl font-bold mb-4">This case study is still in development.</h1>
                    <p className="text-muted-foreground mb-8">We are building more detailed project stories now. Please check back soon.</p>
                    <Link
                        href="/portfolio"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background rounded-lg"
                    >
                        Back to Portfolio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-surface">
            <div className="container mx-auto px-4 py-16">
                <Link
                    href="/portfolio"
                    className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Portfolio
                </Link>

                <article className="bg-surface/80 border border-accent/20 rounded-3xl p-10 shadow-[0_20px_80px_rgba(0,0,0,0.12)]">
                    <header className="mb-10">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 text-accent text-sm font-semibold mb-4">
                            <Sparkles size={16} /> Featured Case Study
                        </span>
                        <h1 className="text-5xl font-bold text-foreground mb-4">{study.title}</h1>
                        <p className="text-muted-foreground text-lg max-w-3xl">{study.client} — {study.status === 'completed' ? 'Completed' : 'In progress'}</p>
                    </header>

                    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                        <section className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-semibold text-foreground mb-3">Challenge</h2>
                                <p className="text-text-secondary leading-8">{study.challenge}</p>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-foreground mb-3">Solution</h2>
                                <p className="text-text-secondary leading-8">{study.solution}</p>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-foreground mb-3">Outcome</h2>
                                <p className="text-text-secondary leading-8">{study.outcome}</p>
                            </div>
                        </section>

                        <aside className="space-y-6 rounded-3xl bg-background/80 border border-border p-6">
                            <div>
                                <h3 className="text-xl font-semibold text-foreground mb-3">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {study.tech.map((item) => (
                                        <span
                                            key={item}
                                            className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/10 px-3 py-2 text-sm text-accent"
                                        >
                                            <CheckCircle2 size={14} /> {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="rounded-3xl bg-accent/10 p-5">
                                <p className="text-sm text-accent font-semibold">Want a similar result?</p>
                                <p className="text-text-secondary leading-7 mt-3">Talk to us about a modern platform, automation workflow, or infrastructure upgrade that scales with your business.</p>
                                <Link
                                    href="/contact"
                                    className="mt-5 inline-flex items-center justify-center w-full rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-background"
                                >
                                    Request a free project review
                                </Link>
                            </div>
                        </aside>
                    </div>
                </article>
            </div>
        </div>
    );
}
