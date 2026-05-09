import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Bell, Clock } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Upcoming Projects | Nereid Systems',
    description: 'Get a sneak peek at our upcoming projects in medical technology and sports analytics.',
};

const upcomingProjects = [
    {
        id: 'medrating-panama',
        title: 'MedRating Panama',
        description: 'A comprehensive medical rating and review platform for healthcare providers in Panama. Features AI-powered sentiment analysis, patient feedback aggregation, and provider performance metrics.',
        tech: ['Next.js', 'TypeScript', 'AI/ML', 'PostgreSQL', 'Mapbox'],
        timeline: 'Q3 2026',
        status: 'In Development',
        features: [
            'Provider search and filtering',
            'AI-powered review analysis',
            'Patient satisfaction scoring',
            'Real-time availability checking',
            'Multi-language support (Spanish/English)'
        ]
    },
    {
        id: 'football-analyzer-scout',
        title: 'Football Analyzer & Scout',
        description: 'AI-driven football talent scouting platform that analyzes player performance data, provides predictive analytics, and helps scouts identify emerging talent.',
        tech: ['Python', 'TensorFlow', 'React', 'D3.js', 'AWS'],
        timeline: 'Q4 2026',
        status: 'Planning Phase',
        features: [
            'Player performance tracking',
            'Predictive career trajectory modeling',
            'Video analysis with AI annotations',
            'Scouting report generation',
            'Team formation optimization'
        ]
    }
];

export default function UpcomingPage() {
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
                        Upcoming Projects
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        We're always exploring new frontiers. Here's what we're working on next.
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    {upcomingProjects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-surface/50 backdrop-blur-sm border border-accent/20 rounded-lg p-8 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl font-semibold text-foreground">{project.title}</h2>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {project.timeline}
                                </div>
                            </div>

                            <div className="mb-4">
                                <span className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full">
                                    {project.status}
                                </span>
                            </div>

                            <p className="text-muted-foreground mb-6">{project.description}</p>

                            <div className="mb-6">
                                <h3 className="font-medium mb-3">Key Features:</h3>
                                <ul className="space-y-2">
                                    {project.features.map((feature, index) => (
                                        <li key={index} className="flex items-center text-sm text-muted-foreground">
                                            <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-medium mb-3">Tech Stack:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 bg-accent/10 text-accent text-sm rounded"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button className="inline-flex items-center px-4 py-2 bg-accent/20 text-accent rounded-lg hover:bg-accent/30 transition-colors">
                                <Bell className="w-4 h-4 mr-2" />
                                Notify Me When Live
                            </button>
                        </div>
                    ))}
                </div>

                {/* Newsletter Signup */}
                <div className="bg-surface/30 backdrop-blur-sm border border-accent/20 rounded-lg p-8 text-center">
                    <h2 className="text-2xl font-semibold mb-4">Stay Updated</h2>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        Be the first to know when these projects launch. Get exclusive early access and updates.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-2 bg-background border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                        <button className="px-6 py-2 bg-accent text-background font-medium rounded-lg hover:bg-accent/90 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}