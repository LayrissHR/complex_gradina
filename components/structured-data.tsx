const baseUrl = "https://complex-gradina.com";

interface StructuredDataProps {
  type: "LodgingBusiness" | "BreadcrumbList";
  locale: string;
  data?: any;
}

export default function StructuredData({
  type,
  locale,
  data,
}: StructuredDataProps) {
  let schema: any = null;

  if (type === "LodgingBusiness") {
    schema = {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      name:
        locale === "bg"
          ? "Стаи за гости в комплекс „Градина“"
          : locale === "ru"
            ? "Сдаются комнаты в «Градина»"
            : "Guest rooms in Gradina",
      description:
        locale === "bg"
          ? "Стаи и апартаменти под наем в Стаи за гости в комплекс „Градина“, гр. Черноморец, м. „Аклади“, само на крачка от плажа."
          : locale === "ru"
            ? "Комнаты и апартаменты в аренду в «Градина», Черноморец, всего в шаге от пляжа."
            : "Guest rooms and apartments in Gradina, Chernomorets, just a step from the beach.",
      image: `${baseUrl}/images/hero-bg.jpg`, // Example hero image
      address: {
        "@type": "PostalAddress",
        streetAddress: "м. Аклади",
        addressLocality: "Черноморец",
        addressRegion: "Бургас",
        postalCode: "8142",
        addressCountry: "BG",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 42.4461,
        longitude: 27.6394,
      },
      url: `${baseUrl}/${locale}`,
      telephone: "+359889716096",
      priceRange: "$$",
      amenityFeature: [
        {
          "@type": "LocationFeatureSpecification",
          name: "Swimming Pool",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "Free WiFi",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "Air Conditioning",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "Parking",
          value: true,
        },
      ],
    };
  }

  if (type === "BreadcrumbList" && data?.breadcrumbs) {
    schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: data.breadcrumbs.map((crumb: any, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: `${baseUrl}${crumb.path}`,
      })),
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
