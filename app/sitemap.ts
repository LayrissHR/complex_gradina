import { MetadataRoute } from "next";
import { getCollection, RoomData } from "@/lib/get-content";

const baseUrl = "https://complex-gradina.com";
const locales = ["bg", "en", "ru"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/rooms", "/prices"];
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    // Basic static routes
    for (const route of routes) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: route === "" ? 1 : 0.8,
      });
    }

    // Dynamic room detail routes
    try {
      const rooms = await getCollection<RoomData>("rooms", locale);
      for (const room of rooms) {
        sitemapEntries.push({
          url: `${baseUrl}/${locale}/rooms/${room.id}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    } catch (error) {
      console.error(`Error fetching rooms for sitemap in locale ${locale}:`, error);
    }
  }

  return sitemapEntries;
}
