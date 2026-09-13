import React from "react";
import Link from "next/link";
import { ShoppingBag, Eye, Truck, CheckCircle2, Clock, XCircle } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/currency";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams?: { status?: string };
}) {
  const statusFilter = searchParams?.status;

  const whereClause: any = {};
  if (statusFilter && statusFilter !== "ALL") {
    whereClause.fulfillmentStatus = statusFilter;
  }

  const [orders, allCount, processingCount, shippedCount, deliveredCount] = await Promise.all([
    prisma.order.findMany({
      where: whereClause,
      include: { items: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.order.count(),
    prisma.order.count({ where: { fulfillmentStatus: "PROCESSING" } }),
    prisma.order.count({ where: { fulfillmentStatus: "SHIPPED" } }),
    prisma.order.count({ where: { fulfillmentStatus: "DELIVERED" } }),
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200">
        <div>
          <h1 className="font-serif text-2xl text-charcoal font-normal">
            Orders & Fulfillment Center
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Track artisan shipments, update tracking numbers, and view customer invoices.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-stone-200 pb-2 text-xs">
        <Link
          href="/admin/orders"
          className={`px-3 py-1.5 rounded-xs transition-colors ${
            !statusFilter || statusFilter === "ALL"
              ? "bg-charcoal text-white font-semibold"
              : "text-stone-600 hover:text-charcoal hover:bg-stone-200"
          }`}
        >
          All Orders ({allCount})
        </Link>
        <Link
          href="/admin/orders?status=PROCESSING"
          className={`px-3 py-1.5 rounded-xs transition-colors ${
            statusFilter === "PROCESSING"
              ? "bg-charcoal text-white font-semibold"
              : "text-stone-600 hover:text-charcoal hover:bg-stone-200"
          }`}
        >
          Processing ({processingCount})
        </Link>
        <Link
          href="/admin/orders?status=SHIPPED"
          className={`px-3 py-1.5 rounded-xs transition-colors ${
            statusFilter === "SHIPPED"
              ? "bg-charcoal text-white font-semibold"
              : "text-stone-600 hover:text-charcoal hover:bg-stone-200"
          }`}
        >
          Shipped ({shippedCount})
        </Link>
        <Link
          href="/admin/orders?status=DELIVERED"
          className={`px-3 py-1.5 rounded-xs transition-colors ${
            statusFilter === "DELIVERED"
              ? "bg-charcoal text-white font-semibold"
              : "text-stone-600 hover:text-charcoal hover:bg-stone-200"
          }`}
        >
          Delivered ({deliveredCount})
        </Link>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-stone-200 rounded-sm shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-sandstone/40 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Order #</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Items</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Fulfillment</th>
                <th className="py-3.5 px-4">Tracking</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-stone-400">
                    No orders match this status.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-sandstone/20 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-charcoal">
                      {order.orderNumber}
                    </td>
                    <td className="py-3.5 px-4 text-stone-500">{formatDate(order.createdAt)}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-charcoal block">{order.shippingName}</span>
                      <span className="text-[10px] text-stone-400">{order.customerEmail}</span>
                    </td>
                    <td className="py-3.5 px-4 text-stone-600">
                      {order.items.reduce((s, i) => s + i.quantity, 0)} pcs
                    </td>
                    <td className="py-3.5 px-4 font-serif font-semibold text-charcoal">
                      {formatPrice(order.total, "INR")}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                          order.paymentStatus === "PAID"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                          order.fulfillmentStatus === "DELIVERED"
                            ? "bg-emerald-100 text-emerald-800"
                            : order.fulfillmentStatus === "SHIPPED"
                            ? "bg-blue-100 text-blue-800"
                            : order.fulfillmentStatus === "CANCELLED"
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {order.fulfillmentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-stone-500 text-[11px]">
                      {order.trackingNumber ? (
                        <span className="font-mono text-charcoal">{order.trackingNumber}</span>
                      ) : (
                        <span className="text-stone-400 italic">Unassigned</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-xs text-terracotta-700 hover:text-terracotta-900 font-semibold"
                      >
                        View & Fulfill →
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
