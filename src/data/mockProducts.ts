import rawProducts from "./products.json";

export interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  category: string;
  sizes: string[];
  images: string[];
}

export const ALL_SIZES = ["85", "90", "95", "100", "105", "110", "115", "120"];

interface RawProduct {
  name: string;
  article: string;
  image: string;
  style: string;
  description: string;
}

export const mockProducts: Product[] = (rawProducts as RawProduct[]).map((p, index) => ({
  id: String(index + 1),
  code: p.article,
  name: p.name,
  description: p.description,
  category: p.style,
  sizes: ALL_SIZES,
  images: [p.image]
}));

export const WHATSAPP_CONTACT_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER || "5491123456789";
