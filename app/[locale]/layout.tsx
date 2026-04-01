import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "../globals.css";

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

export const metadata: Metadata = {
  title: "Комплекс Градина | Seaside Hotel",
  description:
    "Градина Черноморец is a charming seaside hotel on the Bulgarian Black Sea coast. Enjoy sea views, fresh air, and a peaceful retreat. Contact us to check availability.",
  keywords: [
    "Черноморец",
    "хотел",
    "море",
    "Black Sea hotel",
    "Chernomorets",
    "seaside hotel Bulgaria",
    "seaside",
  ],
  openGraph: {
    title: "Градина Черноморец | Seaside Hotel",
    description: "A peaceful seaside retreat on the Bulgarian Black Sea coast.",
    type: "website",
  },
};

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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
