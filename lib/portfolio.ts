export type CaseStudy = {
    id: string;
    title: string;
    client: string;
    challenge: string;
    solution: string;
    tech: string[];
    outcome: string;
    status: 'completed' | 'in-progress';
    slug: string;
    category: string;
    color: string;
};

export const caseStudies: CaseStudy[] = [
    {
        id: 'network-infra-smb',
        title: 'SMB Network Infrastructure Overhaul',
        client: 'Local Manufacturing Co.',
        challenge: 'Legacy network causing frequent downtime and security vulnerabilities.',
        solution: 'Complete network redesign with modern switches, firewalls, and monitoring.',
        tech: ['Cisco', 'Fortinet', 'PRTG', 'VMware'],
        outcome: '99.9% uptime and a 40% reduction in support costs.',
        status: 'completed',
        slug: 'network-infra-smb',
        category: 'Infrastructure',
        color: '#3d7fff',
    },
    {
        id: 'ecommerce-platform',
        title: 'E-commerce Platform Development',
        client: 'Retail Startup',
        challenge: 'Needed scalable online store with inventory management and payment processing.',
        solution: 'Custom Next.js platform with headless CMS and Stripe integration.',
        tech: ['Next.js', 'TypeScript', 'Stripe', 'Sanity CMS'],
        outcome: '200% increase in online sales within 6 months.',
        status: 'completed',
        slug: 'ecommerce-platform',
        category: 'Web/App Development',
        color: '#00d4aa',
    },
    {
        id: 'ai-automation-workflow',
        title: 'AI-Powered Document Processing',
        client: 'Legal Firm',
        challenge: 'Manual document review process taking 20+ hours per week.',
        solution: 'Custom AI workflow using GPT-4 and computer vision for automated document analysis.',
        tech: ['Python', 'OpenAI GPT-4', 'Computer Vision', 'AWS Lambda'],
        outcome: '80% reduction in processing time with 95% accuracy.',
        status: 'completed',
        slug: 'ai-automation-workflow',
        category: 'AI/Automation',
        color: '#fb923c',
    },
];
