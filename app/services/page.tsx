import type { Metadata } from "next";
import { ServicesPageClient } from "@/components/services/ServicesPageClient";

export const metadata: Metadata = {
  title: "Services | Nereid Systems",
  description:
    "Network infrastructure, web & mobile apps, AI automation, and IT management for growing companies. Transparent scope, timelines, and pricing.",
  openGraph: {
    title: "Services | Nereid Systems",
    description:
      "Network infrastructure, web & mobile apps, AI automation, and IT management for growing companies.",
  },
};

const services = [
  {
    id: "network",
    icon: "Network",
    color: "#00d2d2",
    title: "Network Installation & Configuration",
    outcome: "Reliable, secure infrastructure so your team stays connected—not stuck troubleshooting.",
    scope: "Full network design, hardware procurement, switch/router configuration, VLAN segmentation, firewall setup, Wi-Fi deployment, and ongoing monitoring.",
    timeline: "1–4 weeks depending on office size and complexity",
    stack: "Cisco, Ubiquiti, Meraki, pfSense, Fortinet",
    price: "Starting at $2,500",
    cta: "Get a Network Quote",
  },
  {
    id: "web",
    icon: "Globe",
    color: "#3d7fff",
    title: "Web Application Development",
    outcome: "Fast, accessible web apps that convert visitors into customers and scale with demand.",
    scope: "Full-stack web application design and development: architecture, frontend, backend APIs, database design, authentication, deployment, and post-launch support.",
    timeline: "4–16 weeks depending on scope",
    stack: "Next.js, React, Node.js, Python/FastAPI, PostgreSQL, Redis, AWS/Vercel",
    price: "Starting at $8,000",
    cta: "Discuss My Web Project",
  },
  {
    id: "mobile",
    icon: "Smartphone",
    color: "#a78bfa",
    title: "Mobile App Development",
    outcome: "iOS & Android apps that feel native, load instantly, and keep users coming back.",
    scope: "Cross-platform mobile app design and development, App Store / Play Store submission, push notifications, offline support, and iterative post-launch updates.",
    timeline: "8–20 weeks depending on features",
    stack: "React Native, Expo, TypeScript, Firebase, Supabase",
    price: "Starting at $12,000",
    cta: "Discuss My App Idea",
  },
  {
    id: "integration",
    icon: "Layers",
    color: "#fb923c",
    title: "Systems Integration",
    outcome: "Legacy and modern systems working in harmony—no more data silos or manual workarounds.",
    scope: "API design and development, ETL pipelines, ERP/CRM integrations, webhook infrastructure, legacy system adapters, and real-time data sync.",
    timeline: "2–10 weeks depending on system count and complexity",
    stack: "REST/GraphQL APIs, Zapier, n8n, custom Python/Node.js connectors",
    price: "Starting at $4,000",
    cta: "Map Out My Integration",
  },
  {
    id: "ai",
    icon: "Bot",
    color: "#34d399",
    title: "AI Automation Workflows",
    outcome: "Automate repetitive work with AI so your team focuses on what actually moves the needle.",
    scope: "Workflow audit, automation design, LLM-powered process automation, document processing, internal chatbots, and integration with your existing tools.",
    timeline: "2–8 weeks depending on workflow complexity",
    stack: "OpenAI, Anthropic Claude, LangChain, n8n, Python, custom APIs",
    price: "Starting at $3,500",
    cta: "Automate My Workflow",
  },
  {
    id: "it",
    icon: "Server",
    color: "#f472b6",
    title: "IT Management for SMBs",
    outcome: "Proactive IT support and monitoring so you never lose a workday to unexpected outages.",
    scope: "Device management, remote helpdesk, patch management, backup monitoring, security audits, vendor management, and monthly reporting.",
    timeline: "Ongoing monthly retainer — setup in 1 week",
    stack: "Microsoft 365, Jamf, Intune, Backblaze, Sentinel One",
    price: "Starting at $500/month",
    cta: "Get Managed IT",
  },
];

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Service",
                name: s.title,
                description: s.outcome,
                provider: {
                  "@type": "Organization",
                  name: "Nereid Systems",
                },
              },
            })),
          }),
        }}
      />
      <ServicesPageClient services={services} />
    </>
  );
}
