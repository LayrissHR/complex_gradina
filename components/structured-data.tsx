
const baseUrl = "https://complex-gradina.com";

interface StructuredDataProps {
  type: "Hotel" | "BreadcrumbList";
  locale: string;
  data?: any;
}

export default function StructuredData({ type, locale, data }: StructuredDataProps) {
  let schema: any = null;

  if (type === "Hotel") {
    schema = {
      "@context": "https://schema.org",
      "@type": "Hotel",
      "name": locale === "bg" ? "Комплекс Градина" : "Complex Gradina",
      "description": locale === "bg" 
        ? "Очарователен семеен хотел в Черноморец, предлагащ уютни стаи и апартаменти само на крачка от плажа."
        : "A charming family hotel in Chernomorets offering cozy rooms and apartments just a step from the beach.",
      "image": `${baseUrl}/images/hero-bg.jpg`, // Example hero image
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "ул. 9-ти Септември 99",
        "addressLocality": "Черноморец",
        "addressRegion": "Бургас",
        "postalCode": "8142",
        "addressCountry": "BG"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 42.4461,
        "longitude": 27.6394
      },
      "url": `${baseUrl}/${locale}`,
      "telephone": "+359889716096",
      "priceRange": "$$",
      "starRating": {
        "@type": "Rating",
        "ratingValue": "3"
      },
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Swimming Pool", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Free WiFi", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Air Conditioning", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Parking", "value": true }
      ]
    };
  }

  if (type === "BreadcrumbList" && data?.breadcrumbs) {
    schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": data.breadcrumbs.map((crumb: any, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": `${baseUrl}${crumb.path}`
      }))
    };
  }

  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
