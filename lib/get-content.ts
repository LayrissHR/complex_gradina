import fs from 'fs/promises';
import path from 'path';

export interface RoomData {
  id: string;
  title: string;
  description: string;
  capacity: number;
  price: number;
  price_june_sept: number;
  price_july_aug: number;
  image: string;
  gallery: string[];
}

export async function getCollection<T>(collection: string, locale: string): Promise<T[]> {
  const dir = path.join(process.cwd(), 'data', collection, locale);
  
  try {
    // Check if path exists and is a directory
    const stats = await fs.stat(dir).catch(() => null);
    if (!stats || !stats.isDirectory()) {
      return [];
    }

    const files = await fs.readdir(dir);
    const data = await Promise.all(
      files.filter(f => f.endsWith('.json')).map(async (file) => {
        const content = await fs.readFile(path.join(dir, file), 'utf8');
        return {
          id: file.replace('.json', ''),
          ...JSON.parse(content)
        } as T;
      })
    );
    return data;
  } catch (e) {
    console.error(`Error loading collection ${collection} for locale ${locale}:`, e);
    return [];
  }
}

export async function getDoc<T>(collection: string, locale: string, slug: string): Promise<T | null> {
  const filePath = path.join(process.cwd(), 'data', collection, locale, `${slug}.json`);
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return {
      id: slug,
      ...JSON.parse(content)
    } as T;
  } catch (e) {
    console.error(`Error loading doc ${slug} in ${collection} for locale ${locale}:`, e);
    return null;
  }
}
