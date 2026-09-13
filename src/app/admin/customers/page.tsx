import React from "react";
import { Users, Mail, Phone, ShoppingBag } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/currency";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const customers = await prisma.customer.findMany({
    include: {
      addresses: { where: { isDefault: true }, take: 1 },
      _count: { select: { orders: true } },
    },
    orderBy: { totalSpent: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-stone-200">
        <h1 className="font-serif text-2xl text-charcoal font-normal">
          Patron & Customer Network
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          {customers.length} registered patrons supporting Haryana artisan workshops.
        </p>
      </div>

      <div className="bg-white border border-stone-200 rounded-sm shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-sandstone/40 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3.5 px-4">Customer Name</th>
              <th className="py-3.5 px-4">Contact</th>
              <th className="py-3.5 px-4">Primary Location</th>
              <th className="py-3.5 px-4">Orders Placed</th>
              <th className="py-3.5 px-4">Lifetime Value</th>
              <th className="py-3.5 px-4 text-right">Registered</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {customers.map((c) => {
              const address = c.addresses[0];
              return (
                <tr key={c.id} className="hover:bg-sandstone/20 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-charcoal block">
                      {c.firstName} {c.lastName}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-stone-600 space-y-0.5">
                    <div className="flex items-center space-x-1">
                      <Mail className="w-3 h-3 text-stone-400 shrink-0" />
                      <span>{c.email}</span>
                    </div>
                    {c.phone && (
                      <div className="flex items-center space-x-1 text-stone-400">
                        <Phone className="w-3 h-3 shrink-0" />
                        <span>{c.phone}</span>
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">
                    {address ? `${address.city}, ${address.state}` : "—"}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-charcoal">
                    {c.ordersCount || c._count.orders} orders
                  </td>
                  <td className="py-3.5 px-4 font-serif font-semibold text-terracotta-700">
                    {formatPrice(c.totalSpent, "INR")}
                  </td>
                  <td className="py-3.5 px-4 text-stone-400 text-right">
                    {formatDate(c.createdAt)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
