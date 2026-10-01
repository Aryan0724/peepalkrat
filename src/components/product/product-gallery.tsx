"use client";

import React, { useState } from "react";
import Image from "next/image";

interface GalleryImage {
  id: string;
  url: string;
  altText?: string | null;
  isPrimary: boolean;
}

interface ProductGalleryProps {
  images: GalleryImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] || images[0];

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-stone-100 rounded-sm flex items-center justify-center text-stone-400">
        No image available
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar py-1">
          {images.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-16 h-20 md:w-20 md:h-24 rounded-sm overflow-hidden bg-stone-100 border transition-all shrink-0 ${
                activeIndex === idx
                  ? "border-terracotta-600 ring-1 ring-terracotta-600 shadow-xs"
                  : "border-stone-200 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img.url}
                alt={img.altText || `${productName} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image Frame */}
      <div className="relative flex-1 aspect-[4/5] bg-stone-100 rounded-sm overflow-hidden border border-stone-200 shadow-card">
        <Image
          src={activeImage.url}
          alt={activeImage.altText || productName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-3 right-3 bg-charcoal/75 backdrop-blur-xs text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-xs pointer-events-none">
          Handcrafted in Haryana
        </div>
      </div>
    </div>
  );
}
