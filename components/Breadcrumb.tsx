"use client";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const t = useTranslations("Breadcrumb");
  return (
    <nav aria-label={t("label")} style={{ marginBottom: "1.5rem" }}>
      <ol
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.25rem",
          listStyle: "none",
          margin: 0,
          padding: 0,
          fontSize: "0.875rem",
          color: "var(--text-muted)",
        }}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              {i > 0 && (
                <span aria-hidden="true" style={{ color: "var(--text-muted)", margin: "0 0.25rem" }}>
                  /
                </span>
              )}
              {item.href && !isLast ? (
                <Link href={item.href} className="text-link">
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  style={{ color: isLast ? "var(--text-primary)" : "var(--text-muted)" }}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
