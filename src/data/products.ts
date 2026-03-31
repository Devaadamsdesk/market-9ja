import galaxyBudsImg from "@/assets/galaxy-buds.webp";
import iphone14ProImg from "@/assets/iphone14pro.webp";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  images: string[];
  category: string;
  condition: "New" | "Refurbished" | "Used";
  rating: number;
  reviewCount: number;
  inStock: boolean;
  specs: Record<string, string>;
  tags: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

const productImages: Record<string, string> = {
  "iphone-15-pro-max": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop",
  "iphone-14-pro": iphone14ProImg,
  "iphone-13": "https://images.unsplash.com/photo-1632661674596-df8be59a8056?w=600&h=600&fit=crop",
  "samsung-s24-ultra": "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=600&fit=crop",
  "samsung-s23": "https://images.unsplash.com/photo-1678911820864-e5c67e784a38?w=600&h=600&fit=crop",
  "ipad-pro": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop",
  "airpods-pro": "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&h=600&fit=crop",
  "macbook-air": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop",
  "pixel-8": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop",
  "galaxy-tab": "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&h=600&fit=crop",
  "apple-watch": "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600&h=600&fit=crop",
  "samsung-buds": galaxyBudsImg,
};

export const products: Product[] = [
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max 256GB",
    brand: "Apple",
    price: 1250000,
    originalPrice: 1450000,
    description: "The most powerful iPhone ever. Featuring the A17 Pro chip, a 48MP camera system with 5x optical zoom, titanium design, and Action button. Experience desktop-class performance in your pocket.",
    image: productImages["iphone-15-pro-max"],
    images: [productImages["iphone-15-pro-max"], productImages["iphone-14-pro"], productImages["iphone-13"]],
    category: "Phones",
    condition: "New",
    rating: 4.8,
    reviewCount: 234,
    inStock: true,
    specs: { Storage: "256GB", Display: "6.7\" Super Retina XDR", Chip: "A17 Pro", Camera: "48MP Main", Battery: "4422 mAh" },
    tags: ["flash-deal", "featured"],
  },
  {
    id: "iphone-14-pro",
    name: "iPhone 14 Pro 128GB",
    brand: "Apple",
    price: 850000,
    originalPrice: 980000,
    description: "Dynamic Island. Always-On display. 48MP camera. A16 Bionic chip. All in a durable design with Ceramic Shield front and surgical-grade stainless steel.",
    image: productImages["iphone-14-pro"],
    images: [productImages["iphone-14-pro"], productImages["iphone-15-pro-max"]],
    category: "Phones",
    condition: "New",
    rating: 4.7,
    reviewCount: 189,
    inStock: true,
    specs: { Storage: "128GB", Display: "6.1\" Super Retina XDR", Chip: "A16 Bionic", Camera: "48MP Main", Battery: "3200 mAh" },
    tags: ["featured"],
  },
  {
    id: "iphone-13",
    name: "iPhone 13 128GB",
    brand: "Apple",
    price: 520000,
    description: "A15 Bionic chip. Superfast 5G. An advanced dual-camera system. Durable design with Ceramic Shield front. Cinema-grade Dolby Vision HDR video recording.",
    image: productImages["iphone-13"],
    images: [productImages["iphone-13"]],
    category: "Phones",
    condition: "New",
    rating: 4.5,
    reviewCount: 312,
    inStock: true,
    specs: { Storage: "128GB", Display: "6.1\" Super Retina XDR", Chip: "A15 Bionic", Camera: "12MP Dual", Battery: "3240 mAh" },
    tags: [],
  },
  {
    id: "samsung-s24-ultra",
    name: "Samsung Galaxy S24 Ultra 256GB",
    brand: "Samsung",
    price: 1100000,
    originalPrice: 1300000,
    description: "Galaxy AI is here. Search like never before, Icons that translate in real-time, and an Icons pen that helps you create. All on the most powerful Galaxy yet with a titanium frame.",
    image: productImages["samsung-s24-ultra"],
    images: [productImages["samsung-s24-ultra"], productImages["samsung-s23"]],
    category: "Phones",
    condition: "New",
    rating: 4.6,
    reviewCount: 156,
    inStock: true,
    specs: { Storage: "256GB", Display: "6.8\" QHD+ AMOLED", Chip: "Snapdragon 8 Gen 3", Camera: "200MP Main", Battery: "5000 mAh" },
    tags: ["flash-deal", "featured"],
  },
  {
    id: "samsung-s23",
    name: "Samsung Galaxy S23 128GB",
    brand: "Samsung",
    price: 650000,
    description: "Meet Galaxy S23. Iconic design, now made with recycled materials. Nightography camera to Icons capture the night. The fastest chip ever in Galaxy.",
    image: productImages["samsung-s23"],
    images: [productImages["samsung-s23"]],
    category: "Phones",
    condition: "New",
    rating: 4.4,
    reviewCount: 203,
    inStock: true,
    specs: { Storage: "128GB", Display: "6.1\" FHD+ AMOLED", Chip: "Snapdragon 8 Gen 2", Camera: "50MP Main", Battery: "3900 mAh" },
    tags: [],
  },
  {
    id: "ipad-pro",
    name: "iPad Pro 12.9\" M2 256GB",
    brand: "Apple",
    price: 980000,
    description: "Supercharged by the M2 chip. With next-level Apple Pencil hover experience. WiFi 6E. ProRes video recording. And a Liquid Retina XDR display.",
    image: productImages["ipad-pro"],
    images: [productImages["ipad-pro"]],
    category: "Tablets",
    condition: "New",
    rating: 4.9,
    reviewCount: 87,
    inStock: true,
    specs: { Storage: "256GB", Display: "12.9\" Liquid Retina XDR", Chip: "Apple M2", Camera: "12MP Wide", Battery: "10 hours" },
    tags: ["featured"],
  },
  {
    id: "airpods-pro",
    name: "AirPods Pro (2nd Gen) USB-C",
    brand: "Apple",
    price: 185000,
    description: "Rebuilt from the sound up. Adaptive Audio seamlessly blends Active Noise Cancellation and Transparency mode. Conversation Awareness lowers media volume when speaking.",
    image: productImages["airpods-pro"],
    images: [productImages["airpods-pro"]],
    category: "Accessories",
    condition: "New",
    rating: 4.7,
    reviewCount: 445,
    inStock: true,
    specs: { Type: "In-Ear", ANC: "Yes", Battery: "6 hours (30 with case)", Connector: "USB-C", Water: "IPX4" },
    tags: ["flash-deal"],
  },
  {
    id: "macbook-air",
    name: "MacBook Air M2 13\" 256GB",
    brand: "Apple",
    price: 1050000,
    description: "Strikingly thin design. Supercharged by M2. Up to 18 hours of battery life. A brilliant 13.6-inch Liquid Retina display. All-day battery life.",
    image: productImages["macbook-air"],
    images: [productImages["macbook-air"]],
    category: "Tablets",
    condition: "New",
    rating: 4.8,
    reviewCount: 134,
    inStock: true,
    specs: { Storage: "256GB SSD", Display: "13.6\" Liquid Retina", Chip: "Apple M2", RAM: "8GB", Battery: "18 hours" },
    tags: ["featured"],
  },
  {
    id: "pixel-8",
    name: "Google Pixel 8 128GB",
    brand: "Google",
    price: 480000,
    description: "The helpful phone, powered by Google AI. Take incredible photos with the advanced camera. Get more done with smart features built into your phone.",
    image: productImages["pixel-8"],
    images: [productImages["pixel-8"]],
    category: "Phones",
    condition: "New",
    rating: 4.3,
    reviewCount: 98,
    inStock: true,
    specs: { Storage: "128GB", Display: "6.2\" OLED", Chip: "Google Tensor G3", Camera: "50MP Main", Battery: "4575 mAh" },
    tags: [],
  },
  {
    id: "galaxy-tab",
    name: "Samsung Galaxy Tab S9 256GB",
    brand: "Samsung",
    price: 720000,
    description: "Vivid Dynamic AMOLED 2X display with Vision Booster. IP68 water and dust resistance. Powerful Snapdragon 8 Gen 2 for Galaxy processor.",
    image: productImages["galaxy-tab"],
    images: [productImages["galaxy-tab"]],
    category: "Tablets",
    condition: "New",
    rating: 4.5,
    reviewCount: 67,
    inStock: true,
    specs: { Storage: "256GB", Display: "11\" AMOLED", Chip: "Snapdragon 8 Gen 2", Camera: "13MP Main", Battery: "8400 mAh" },
    tags: [],
  },
  {
    id: "apple-watch",
    name: "Apple Watch Series 9 45mm",
    brand: "Apple",
    price: 380000,
    description: "A magical new way to use your Apple Watch without touching the screen. The brightest Apple Watch display ever. Carbon neutral with select bands.",
    image: productImages["apple-watch"],
    images: [productImages["apple-watch"]],
    category: "Accessories",
    condition: "New",
    rating: 4.6,
    reviewCount: 178,
    inStock: true,
    specs: { Display: "45mm Always-On Retina", Chip: "S9 SiP", Sensors: "Heart Rate, SpO2, Temp", Water: "WR50", Battery: "18 hours" },
    tags: ["featured"],
  },
  {
    id: "samsung-buds",
    name: "Samsung Galaxy Buds2 Pro",
    brand: "Samsung",
    price: 125000,
    originalPrice: 155000,
    description: "Hi-Fi sound with 24bit audio. Intelligent Active Noise Cancellation adapts to your surroundings. 360 Audio brings your content to life.",
    image: productImages["samsung-buds"],
    images: [productImages["samsung-buds"]],
    category: "Accessories",
    condition: "New",
    rating: 4.4,
    reviewCount: 223,
    inStock: true,
    specs: { Type: "In-Ear", ANC: "Yes", Battery: "5 hours (18 with case)", Connector: "USB-C", Water: "IPX7" },
    tags: ["flash-deal"],
  },
];

export const categories = [
  { name: "Phones", icon: "📱", count: products.filter(p => p.category === "Phones").length },
  { name: "Tablets", icon: "📋", count: products.filter(p => p.category === "Tablets").length },
  { name: "Accessories", icon: "🎧", count: products.filter(p => p.category === "Accessories").length },
];

export const mockReviews: Review[] = [
  { id: "1", author: "Chidi O.", rating: 5, date: "2024-12-15", comment: "Excellent product! Delivery was fast to Lagos. Very happy with my purchase." },
  { id: "2", author: "Amaka N.", rating: 4, date: "2024-12-10", comment: "Good quality, exactly as described. Would recommend to friends." },
  { id: "3", author: "Tunde A.", rating: 5, date: "2024-11-28", comment: "Best price I found anywhere in Nigeria. Genuine product, no wahala!" },
  { id: "4", author: "Fatima B.", rating: 4, date: "2024-11-20", comment: "Great device, battery life is amazing. Customer service was helpful too." },
  { id: "5", author: "Emeka I.", rating: 5, date: "2024-11-15", comment: "Market9ja never disappoints! This is my third purchase and quality is always top notch." },
];

export function formatPrice(price: number): string {
  return "₦" + price.toLocaleString("en-NG");
}

export function getProductsByTag(tag: string): Product[] {
  return products.filter(p => p.tags.includes(tag));
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );
}
