"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CurrencyCode, CurrencyConfig } from "@/types";
import { CURRENCIES, formatPrice, convertFromINR } from "./currency";

interface CurrencyContextType {
  currency: CurrencyCode;
  currencyConfig: CurrencyConfig;
  setCurrency: (code: CurrencyCode) => void;
  format: (amountInINR: number) => string;
  convert: (amountInINR: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("INR");

  useEffect(() => {
    const saved = localStorage.getItem("peepalkrat_currency") as CurrencyCode;
    if (saved && CURRENCIES[saved]) {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    if (typeof window !== "undefined") {
      localStorage.setItem("peepalkrat_currency", code);
    }
  };

  const currencyConfig = CURRENCIES[currency] || CURRENCIES.INR;

  const format = (amountInINR: number) => formatPrice(amountInINR, currency);
  const convert = (amountInINR: number) => convertFromINR(amountInINR, currency);

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        currencyConfig,
        setCurrency,
        format,
        convert,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
