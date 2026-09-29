"use client";
import React from "react";
import { MessageCircle } from "lucide-react";

export function WhatsAppWidget() {
  const phoneNumber = "919999999999"; // Replace with actual business number
  const message = "Hi! I need help with PeepalKraft products.";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute right-full mr-4 bg-white text-stone-800 text-xs font-semibold px-3 py-1.5 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-sm pointer-events-none">
        Chat with Artisan Support
      </span>
    </a>
  );
}
