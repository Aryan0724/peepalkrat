"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin";

  const [email, setEmail] = useState("admin@peepalkrat.com");
  const [password, setPassword] = useState("PeepalKrat@2026!");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid credentials.");
      }

      router.push(from);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white py-8 px-6 shadow-editorial border border-stone-200 rounded-sm sm:px-10">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
            Administrative Email
          </label>
          <div className="mt-1 relative">
            <Mail className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-terracotta-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
            Password
          </label>
          <div className="mt-1 relative">
            <Lock className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-terracotta-500"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-sm text-xs text-red-700 flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <Button
          type="submit"
          variant="editorial"
          size="lg"
          disabled={isLoading}
          className="w-full h-11 text-xs"
        >
          {isLoading ? "Authenticating Session..." : "Enter Operations Console"}
        </Button>
      </form>

      {/* Quick Demo Help */}
      <div className="mt-6 pt-5 border-t border-stone-100 bg-sandstone/30 -mx-6 -mb-8 p-5 rounded-b-sm text-[11px] text-stone-600 space-y-1">
        <span className="font-semibold text-charcoal block">
          Default Seeded Administrator:
        </span>
        <p>Email: <code className="bg-stone-200 px-1 py-0.5 rounded text-charcoal">admin@peepalkrat.com</code></p>
        <p>Password: <code className="bg-stone-200 px-1 py-0.5 rounded text-charcoal">PeepalKrat@2026!</code></p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-sandstone/40 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block">
          <span className="font-serif text-3xl font-semibold tracking-wider text-charcoal">
            PEEPALKRAT
          </span>
          <span className="block text-[9px] uppercase tracking-[0.25em] text-stone-500 font-semibold -mt-1">
            Staff & Operations Console
          </span>
        </Link>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Suspense fallback={<div className="p-8 text-center text-xs text-stone-500">Loading authentication console...</div>}>
          <LoginForm />
        </Suspense>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-stone-500 hover:text-charcoal underline"
          >
            ← Return to Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
