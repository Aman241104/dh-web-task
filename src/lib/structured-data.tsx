const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Northline",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "API observability and on-call platform for engineering teams.",
  sameAs: [],
};

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "API observability and on-call platform",
  provider: {
    "@type": "Organization",
    name: "Northline",
  },
  areaServed: "Worldwide",
  description:
    "Real-time API monitoring, incident on-call routing, and deployment tracing for engineering teams.",
};

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export const SITE_URL_EXPORT = SITE_URL;
