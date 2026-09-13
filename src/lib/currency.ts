import { CurrencyCode, CurrencyConfig } from "@/types";

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: {
    code: "INR",
    symbol: "₹",
    name: "Indian Rupee",
    rateAgainstINR: 1.0,
  },
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    rateAgainstINR: 0.012,
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    rateAgainstINR: 0.011,
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    rateAgainstINR: 0.0094,
  },
};

export function convertFromINR(amountInINR: number, targetCurrency: CurrencyCode): number {
  const config = CURRENCIES[targetCurrency] || CURRENCIES.INR;
  if (targetCurrency === "INR") return Math.round(amountInINR);
  // For international currencies, round to nearest 2 decimals or whole number
  const converted = amountInINR * config.rateAgainstINR;
  return Math.round(converted * 100) / 100;
}

export function formatPrice(amountInINR: number, targetCurrency: CurrencyCode = "INR"): string {
  const config = CURRENCIES[targetCurrency] || CURRENCIES.INR;
  const converted = convertFromINR(amountInINR, targetCurrency);

  if (targetCurrency === "INR") {
    return `₹${Math.round(converted).toLocaleString("en-IN")}`;
  } else if (targetCurrency === "USD") {
    return `$${converted.toFixed(2)}`;
  } else if (targetCurrency === "EUR") {
    return `€${converted.toFixed(2)}`;
  } else if (targetCurrency === "GBP") {
    return `£${converted.toFixed(2)}`;
  }
  return `${config.symbol}${converted}`;
}
