export type CurrencyCode = "INR" | "USD" | "EUR" | "GBP";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateAgainstINR: number; // 1 INR = rate
}

export interface ProductWithRelations {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string | null;
  price: number;
  compareAtPrice?: number | null;
  currency: string;
  categoryId: string;
  collectionId?: string | null;
  makerId?: string | null;
  tags?: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  inventory: number;
  lowStockThreshold: number;
  material?: string | null;
  dimensions?: string | null;
  weight?: string | null;
  careInstructions?: string | null;
  shippingInfo?: string | null;
  productionLocation?: string | null;
  storySnippet?: string | null;
  impactNotes?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  collection?: {
    id: string;
    name: string;
    slug: string;
  } | null;
  maker?: {
    id: string;
    name: string;
    slug: string;
    title: string;
    photo: string;
    villageDistrict: string;
    craftSkill: string;
    quote?: string | null;
    verifiedImpactData?: string | null;
  } | null;
  images: {
    id: string;
    url: string;
    altText?: string | null;
    isPrimary: boolean;
    order: number;
  }[];
  variants: {
    id: string;
    sku?: string | null;
    name: string;
    size?: string | null;
    color?: string | null;
    price?: number | null;
    compareAtPrice?: number | null;
    inventory: number;
  }[];
  reviews?: {
    id: string;
    customerName: string;
    rating: number;
    title?: string | null;
    comment: string;
    createdAt: Date | string;
  }[];
}

export interface CartItemModel {
  id: string; // unique item key
  productId: string;
  variantId?: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  quantity: number;
  imageUrl: string;
  makerName?: string;
  variantName?: string;
}

export interface AppliedCoupon {
  code: string;
  discountType: "PERCENTAGE" | "FIXED";
  discountValue: number;
  description?: string;
}

export interface MakerProfile {
  id: string;
  name: string;
  slug: string;
  title: string;
  photo: string;
  villageDistrict: string;
  craftSkill: string;
  biography: string;
  quote?: string | null;
  videoUrl?: string | null;
  verifiedImpactData?: string | null;
  isFeatured: boolean;
  products?: {
    id: string;
    name: string;
    slug: string;
    price: number;
    images: { url: string; isPrimary: boolean }[];
  }[];
}
