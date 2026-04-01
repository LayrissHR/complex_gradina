import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "../globals.css";
import { getDictionary, Locale } from "@/lib/get-dictionary";
import StructuredData from "@/components/structured-data";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export async function generateStaticParams() {
  return [{ locale: "bg" }, { locale: "en" }, { locale: "ru" }];
}

const baseUrl = "https://complex-gradina.com"; // Placeholder, update to actual domain

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  const seo = dict.seo;

  return {
    title: {
        template: `%s | ${seo.title}`,
        default: seo.title,
    },
    description: seo.description,
    keywords: seo.keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        bg: "/bg",
        ru: "/ru",
        "x-default": "/bg",
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `${baseUrl}/${locale}`,
      siteName: seo.title,
      locale: locale === "bg" ? "bg_BG" : locale === "ru" ? "ru_RU" : "en_US",
      type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: seo.title,
        description: seo.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/apple-icon.png",
    },
  };
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const { locale } = params;
  const { children } = props;

  return (
    <html lang={locale} className={`${cormorant.variable} ${inter.variable}`}>
      <body
        className="antialiased"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        <StructuredData type="Hotel" locale={locale} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
