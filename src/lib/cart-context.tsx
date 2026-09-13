"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItemModel, AppliedCoupon } from "@/types";

interface CartContextType {
  items: CartItemModel[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItemModel, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  appliedCoupon: AppliedCoupon | null;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  subtotal: number;
  discount: number;
  shippingFee: number;
  freeShippingThreshold: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD_INR = 2000;
const STANDARD_SHIPPING_FEE_INR = 150;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItemModel[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("peepalkrat_cart");
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      const savedCoupon = localStorage.getItem("peepalkrat_coupon");
      if (savedCoupon) {
        setAppliedCoupon(JSON.parse(savedCoupon));
      }
    } catch (e) {
      console.error("Failed reading cart from localStorage", e);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem("peepalkrat_cart", JSON.stringify(items));
      } catch (e) {
        console.error("Failed saving cart to localStorage", e);
      }
    }
  }, [items, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      try {
        if (appliedCoupon) {
          localStorage.setItem("peepalkrat_coupon", JSON.stringify(appliedCoupon));
        } else {
          localStorage.removeItem("peepalkrat_coupon");
        }
      } catch (e) {
        console.error("Failed saving coupon", e);
      }
    }
  }, [appliedCoupon, isInitialized]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = (item: Omit<CartItemModel, "id">) => {
    const id = `${item.productId}-${item.variantId || "default"}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, { ...item, id }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === "PERCENTAGE") {
      discount = (subtotal * appliedCoupon.discountValue) / 100;
    } else {
      discount = appliedCoupon.discountValue;
    }
  }

  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD_INR || subtotal === 0 ? 0 : STANDARD_SHIPPING_FEE_INR;
  const total = Math.max(0, subtotal - discount + shippingFee);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const applyCoupon = async (code: string): Promise<{ success: boolean; message: string }> => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      return { success: false, message: "Please enter a coupon code." };
    }

    try {
      const res = await fetch(`/api/coupons/validate?code=${encodeURIComponent(cleanCode)}&subtotal=${subtotal}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setAppliedCoupon(data.coupon);
        return { success: true, message: `Coupon '${cleanCode}' applied!` };
      } else {
        return { success: false, message: data.message || "Invalid coupon code." };
      }
    } catch {
      // Fallback local check for seeded coupons if offline
      if (cleanCode === "WELCOME10") {
        if (subtotal < 1500) {
          return { success: false, message: "WELCOME10 requires a minimum order of ₹1,500." };
        }
        setAppliedCoupon({
          code: "WELCOME10",
          discountType: "PERCENTAGE",
          discountValue: 10,
          description: "10% off your order",
        });
        return { success: true, message: "Coupon WELCOME10 applied! 10% off" };
      } else if (cleanCode === "HARYANAHERITAGE") {
        if (subtotal < 3500) {
          return { success: false, message: "HARYANAHERITAGE requires minimum order of ₹3,500." };
        }
        setAppliedCoupon({
          code: "HARYANAHERITAGE",
          discountType: "PERCENTAGE",
          discountValue: 15,
          description: "15% off heritage crafts",
        });
        return { success: true, message: "Coupon HARYANAHERITAGE applied! 15% off" };
      }
      return { success: false, message: "Coupon code not recognized or expired." };
    }
  };

  const removeCoupon = () => setAppliedCoupon(null);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discount,
        shippingFee,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD_INR,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
