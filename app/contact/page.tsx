import type { Metadata } from "next";
import { ContactPageClient } from "@/components/contact/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact | Nereid Systems",
  description:
    "Book a free consultation or send us a message. We respond within 24 business hours.",
  openGraph: {
    title: "Contact | Nereid Systems",
    description: "Book a free consultation or send us a message. Response within 24 business hours.",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
