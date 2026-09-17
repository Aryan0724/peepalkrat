"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  FolderTree,
  Tag,
  Boxes,
  FileText,
  Settings,
  LogOut,
  ExternalLink,
  Layers,
  Sparkles,
} from "lucide-react";

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/makers", label: "Makers & Artisans", icon: Users },
    { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
    { href: "/admin/inventory", label: "Inventory", icon: Boxes },
    { href: "/admin/categories", label: "Categories", icon: FolderTree },
    { href: "/admin/collections", label: "Collections", icon: Layers },
    { href: "/admin/customers", label: "Customers", icon: Users },
    { href: "/admin/coupons", label: "Coupons", icon: Tag },
    { href: "/admin/content", label: "Pages & Content CMS", icon: FileText },
    { href: "/admin/settings", label: "Store Settings", icon: Settings },
  ];

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-64 bg-charcoal text-stone-300 flex flex-col justify-between shrink-0 min-h-screen border-r border-stone-800">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-stone-800">
          <Link href="/admin" className="block">
            <span className="font-serif text-xl font-semibold tracking-wider text-white">
              PEEPALKRAT
            </span>
            <span className="block text-[9px] uppercase tracking-[0.25em] text-terracotta-400 font-semibold mt-0.5">
              Operations Console
            </span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-xs text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-terracotta-600 text-white font-semibold"
                    : "text-stone-400 hover:text-white hover:bg-stone-900"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Utility Actions */}
      <div className="p-4 border-t border-stone-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 text-xs text-stone-400 hover:text-white hover:bg-stone-900 rounded-xs transition-colors"
        >
          <span className="flex items-center space-x-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Storefront</span>
          </span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-stone-900 rounded-xs transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
