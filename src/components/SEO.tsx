import { Helmet } from "react-helmet-async";

export const SITE_URL = "https://mwauramurokiadvocates.co.ke";
export const SITE_NAME = "Mwaura Muroki Associates & Advocates";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/uploads/7ac751ff-dfac-4f6b-9e97-e9e8eb7fe3b8.png`;
export const PHONE = "+254704780934";
export const ADDRESS = {
  street: "Equity Plaza, Commercial Street, 4th Floor Wing B Room 420",
  locality: "Thika",
  country: "KE",
} as const;

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

const SEO = ({
  title,
  description,
  canonical,
  keywords,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noindex = false,
  schema,
}: SEOProps) => {
  const url = canonical ?? SITE_URL;
  const robots = noindex ? "noindex, follow" : "index, follow, max-image-preview:large";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={SITE_NAME} />
      <meta property="og:locale" content="en_KE" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(schema) ? schema : [schema])}
        </script>
      )}
    </Helmet>
  );
};

export const attorneySchema = {
  "@context": "https://schema.org",
  "@type": "Attorney",
  "@id": `${SITE_URL}/#attorney`,
  name: SITE_NAME,
  url: SITE_URL,
  image: DEFAULT_OG_IMAGE,
  description:
    "Timely and affordable legal services in Thika and across Kenya: commercial litigation, contract drafting, dispute resolution, family law, sports law, legal research and mental health law.",
  telephone: PHONE,
  email: "mwauramurokiadvocates@gmail.com",
  priceRange: "KES",
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS.street,
    addressLocality: ADDRESS.locality,
    addressCountry: ADDRESS.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -1.0333,
    longitude: 37.0693,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],
  areaServed: ["Thika", "Nairobi", "Kiambu", "Kenya"],
  sameAs: [
    "https://facebook.com/francis.muroki",
    "https://instagram.com/IamMwauraMuroki",
    "https://linkedin.com/in/mwaura-muroki",
    "https://twitter.com/Iammwauramuroki",
  ],
  founder: {
    "@type": "Person",
    name: "Francis Mwaura Muroki",
    jobTitle: "Principal Advocate",
  },
};

export default SEO;
