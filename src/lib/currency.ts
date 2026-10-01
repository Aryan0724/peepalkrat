import { CurrencyCode, CurrencyConfig } from "@/types";

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar (United States)",
    rateAgainstINR: 0.012,
  },
  GBP: {
    code: "GBP",
    symbol: "Â£",
    name: "British Pound (United Kingdom)",
    rateAgainstINR: 0.0094,
  },
  EUR: {
    code: "EUR",
    symbol: "â‚¬",
    name: "Euro (Europe)",
    rateAgainstINR: 0.011,
  },
  CAD: {
    code: "CAD",
    symbol: "CA$",
    name: "Canadian Dollar (Canada)",
    rateAgainstINR: 0.016,
  },
  AUD: {
    code: "AUD",
    symbol: "AU$",
    name: "Australian Dollar (Australia)",
    rateAgainstINR: 0.018,
  },
  INR: {
    code: "INR",
    symbol: "â‚¹",
    name: "Indian Rupee (India)",
    rateAgainstINR: 1.0,
  },
};

export function convertFromINR(amountInINR: number, targetCurrency: CurrencyCode = "USD"): number {
  const config = CURRENCIES[targetCurrency] || CURRENCIES.USD;
  if (targetCurrency === "INR") return Math.round(amountInINR);
  const converted = amountInINR * config.rateAgainstINR;
  return Math.round(converted * 100) / 100;
}

export function formatPrice(amountInINR: number, targetCurrency: CurrencyCode = "USD"): string {
  const config = CURRENCIES[targetCurrency] || CURRENCIES.USD;
  const converted = convertFromINR(amountInINR, targetCurrency);

  if (targetCurrency === "INR") {
    return `â‚¹${Math.round(converted).toLocaleString("en-IN")}`;
  } else if (targetCurrency === "USD") {
    return `$${converted.toFixed(2)}`;
  } else if (targetCurrency === "GBP") {
    return `Â£${converted.toFixed(2)}`;
  } else if (targetCurrency === "EUR") {
    return `â‚¬${converted.toFixed(2)}`;
  } else if (targetCurrency === "CAD") {
    return `CA$${converted.toFixed(2)}`;
  } else if (targetCurrency === "AUD") {
    return `AU$${converted.toFixed(2)}`;
  }
  return `${config.symbol}${converted.toFixed(2)}`;
}
