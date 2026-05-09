import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Simple quote estimation based on keywords
// In production, replace with actual AI/LLM integration
const quoteSchema = z.object({
    description: z.string().min(10, "Description must be at least 10 characters"),
    service: z.string().optional(),
});

interface QuoteEstimate {
    service: string;
    complexity: 'basic' | 'standard' | 'advanced';
    timeline: string;
    price: {
        min: number;
        max: number;
    };
    features: string[];
    reasoning: string;
}

function estimateQuote(description: string): QuoteEstimate {
    const desc = description.toLowerCase();

    // Network-related
    if (desc.includes('network') || desc.includes('wifi') || desc.includes('infrastructure') || desc.includes('servers')) {
        return {
            service: 'Network Installation & Configuration',
            complexity: desc.includes('enterprise') || desc.includes('large') ? 'advanced' : 'standard',
            timeline: '1-4 weeks',
            price: { min: 2500, max: 15000 },
            features: ['Network design', 'Hardware setup', 'Security configuration', 'Monitoring'],
            reasoning: 'Based on network infrastructure requirements mentioned.'
        };
    }

    // Web app
    if (desc.includes('web') || desc.includes('website') || desc.includes('app') || desc.includes('dashboard')) {
        const complexity = desc.includes('ecommerce') || desc.includes('complex') ? 'advanced' :
            desc.includes('simple') || desc.includes('basic') ? 'basic' : 'standard';
        return {
            service: 'Web Application Development',
            complexity,
            timeline: complexity === 'basic' ? '4-8 weeks' : complexity === 'standard' ? '8-12 weeks' : '12-16 weeks',
            price: {
                min: complexity === 'basic' ? 8000 : complexity === 'standard' ? 15000 : 25000,
                max: complexity === 'basic' ? 12000 : complexity === 'standard' ? 25000 : 40000
            },
            features: ['Frontend development', 'Backend API', 'Database design', 'Authentication', 'Deployment'],
            reasoning: 'Web application requirements identified with estimated complexity.'
        };
    }

    // Mobile app
    if (desc.includes('mobile') || desc.includes('ios') || desc.includes('android') || desc.includes('app store')) {
        return {
            service: 'Mobile App Development',
            complexity: desc.includes('complex') || desc.includes('multiple platforms') ? 'advanced' : 'standard',
            timeline: '8-20 weeks',
            price: { min: 12000, max: 35000 },
            features: ['Cross-platform development', 'UI/UX design', 'App store submission', 'Push notifications'],
            reasoning: 'Mobile application development requirements detected.'
        };
    }

    // AI/Automation
    if (desc.includes('ai') || desc.includes('automation') || desc.includes('chatbot') || desc.includes('ml')) {
        return {
            service: 'AI Automation Workflows',
            complexity: 'standard',
            timeline: '2-8 weeks',
            price: { min: 3500, max: 12000 },
            features: ['Workflow analysis', 'AI integration', 'Custom automation', 'Testing'],
            reasoning: 'AI and automation requirements identified.'
        };
    }

    // Integration
    if (desc.includes('integration') || desc.includes('api') || desc.includes('connect') || desc.includes('sync')) {
        return {
            service: 'Systems Integration',
            complexity: desc.includes('multiple') || desc.includes('complex') ? 'advanced' : 'standard',
            timeline: '2-10 weeks',
            price: { min: 4000, max: 18000 },
            features: ['API development', 'Data mapping', 'Testing', 'Documentation'],
            reasoning: 'Systems integration requirements detected.'
        };
    }

    // IT Management
    if (desc.includes('it') || desc.includes('managed') || desc.includes('support') || desc.includes('monitoring')) {
        return {
            service: 'IT Management for SMBs',
            complexity: 'standard',
            timeline: 'Ongoing',
            price: { min: 500, max: 2000 }, // Monthly
            features: ['24/7 monitoring', 'Helpdesk support', 'Security updates', 'Backup management'],
            reasoning: 'IT management and support requirements identified.'
        };
    }

    // Default fallback
    return {
        service: 'Custom Development',
        complexity: 'standard',
        timeline: '4-12 weeks',
        price: { min: 5000, max: 20000 },
        features: ['Custom development', 'Consultation', 'Project management'],
        reasoning: 'General development requirements. Please provide more details for accurate estimate.'
    };
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = quoteSchema.parse(body);

        const estimate = estimateQuote(data.description);

        return NextResponse.json({
            success: true,
            estimate,
            message: `Based on your description, here's our estimate for ${estimate.service}. This is a rough approximation - we'd love to discuss details for a more accurate quote.`
        }, { status: 200 });

    } catch (err) {
        console.error('[ai-quote] error:', err);
        return NextResponse.json({
            success: false,
            error: 'Invalid request or description too short'
        }, { status: 400 });
    }
}