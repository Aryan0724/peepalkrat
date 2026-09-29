import React from "react";
import { prisma } from "@/lib/db";
import { Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminSubscribersPage() {
  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold text-charcoal">
          Newsletter Subscribers
        </h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      <div className="bg-white rounded-sm border border-stone-200 overflow-hidden">
        <table className="w-full text-left text-sm text-stone-600">
          <thead className="bg-stone-50 border-b border-stone-200 text-xs uppercase tracking-wider font-semibold text-charcoal">
            <tr>
              <th className="px-6 py-4">Email Address</th>
              <th className="px-6 py-4">Subscribed Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {subscribers.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-6 py-8 text-center text-stone-400">
                  No subscribers yet.
                </td>
              </tr>
            ) : (
              subscribers.map((sub: any) => (
                <tr key={sub.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-charcoal flex items-center gap-3">
                    <Mail className="w-4 h-4 text-stone-400" />
                    {sub.email}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(sub.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
