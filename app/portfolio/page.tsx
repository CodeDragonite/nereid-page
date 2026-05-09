import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { caseStudies } from '@/lib/portfolio';

export const metadata: Metadata = {
    title: 'Portfolio | Nereid Systems',
    description: 'Explore our successful projects and case studies in network infrastructure, web development, and AI automation.',
};

const caseStudiesWithLink = caseStudies.map((study) => ({
    ...study,
    link: `/portfolio/${study.slug}`,
}));

export default function PortfolioPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-surface">
            <div className="container mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <Link
                        href="/"
                        className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-accent to-foreground bg-clip-text text-transparent">
                        Our Portfolio
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Real results from real projects. Explore our case studies and see how we've helped businesses navigate their challenges.
                    </p>
                </div>

                {/* Case Studies Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {caseStudiesWithLink.map((study) => (
                        <div
                            key={study.id}
                            className="bg-surface/50 backdrop-blur-sm border border-accent/20 rounded-lg p-6 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-semibold text-foreground">{study.title}</h3>
                                {study.status === 'completed' && (
                                    <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">
                                        Completed
                                    </span>
                                )}
                            </div>

                            <p className="text-sm text-muted-foreground mb-2">
                                <strong>Client:</strong> {study.client}
                            </p>

                            <div className="mb-4">
                                <p className="text-sm mb-2">
                                    <strong>Challenge:</strong> {study.challenge}
                                </p>
                                <p className="text-sm mb-2">
                                    <strong>Solution:</strong> {study.solution}
                                </p>
                                <p className="text-sm">
                                    <strong>Outcome:</strong> {study.outcome}
                                </p>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm font-medium mb-2">Tech Stack:</p>
                                <div className="flex flex-wrap gap-1">
                                    {study.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 bg-accent/10 text-accent text-xs rounded"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <Link
                                href={study.link}
                                className="inline-flex items-center text-accent hover:text-accent/80 transition-colors"
                            >
                                View Case Study
                                <ExternalLink className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <h2 className="text-2xl font-semibold mb-4">Ready to Start Your Project?</h2>
                    <p className="text-muted-foreground mb-8">
                        Let's discuss how we can help you achieve similar results.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center px-6 py-3 bg-accent text-background font-medium rounded-lg hover:bg-accent/90 transition-colors"
                    >
                        Get in Touch
                    </Link>
                </div>
            </div>
        </div>
    );
}