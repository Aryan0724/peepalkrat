"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AdminNav } from "@/components/admin/admin-nav";
import { AdminHeader } from "@/components/admin/admin-header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // If on login screen, render clean canvas without admin sidebar
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-sandstone/30">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#F8F6F2]">
      <AdminNav />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
