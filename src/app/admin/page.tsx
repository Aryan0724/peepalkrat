import React from "react";
import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Clock,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/currency";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // Aggregate real database stats
  const [
    totalOrdersCount,
    orders,
    productsCount,
    makersCount,
    lowStockProducts,
    customersCount,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      include: { items: true },
    }),
    prisma.product.count({ where: { isPublished: true } }),
    prisma.maker.count(),
    prisma.product.findMany({
      where: {
        inventory: { lte: 4 },
        isPublished: true,
      },
      take: 5,
      select: { id: true, name: true, sku: true, inventory: true, price: true },
    }),
    prisma.customer.count(),
  ]);

  // Compute revenue & AOV
  const paidOrders = await prisma.order.findMany({
    where: { paymentStatus: "PAID" },
    select: { total: true },
  });

  const totalRevenue = paidOrders.reduce((sum, o) => sum + o.total, 0);
  const averageOrderValue = paidOrders.length > 0 ? Math.round(totalRevenue / paidOrders.length) : 0;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
            Executive Operations Overview
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Haryana artisan enterprise metrics, live orders, and catalog health.
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Link
            href="/admin/products/new"
            className="bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-semibold px-4 py-2 rounded-xs shadow-xs transition-colors"
          >
            + Add New Product
          </Link>
          <Link
            href="/admin/makers/new"
            className="bg-charcoal hover:bg-stone-800 text-white text-xs font-semibold px-4 py-2 rounded-xs shadow-xs transition-colors"
          >
            + Register Artisan
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Total Revenue
            </span>
            <span className="p-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
              INR
            </span>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
            {formatPrice(totalRevenue, "INR")}
          </div>
          <p className="text-[11px] text-stone-400">Lifetime paid commerce volume</p>
        </div>

        {/* Orders Count */}
        <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Total Orders
            </span>
            <ShoppingBag className="w-4 h-4 text-terracotta-600" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
            {totalOrdersCount}
          </div>
          <p className="text-[11px] text-stone-400">Average Order: {formatPrice(averageOrderValue, "INR")}</p>
        </div>

        {/* Active Makers */}
        <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Active Makers
            </span>
            <Users className="w-4 h-4 text-mustard-500" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
            {makersCount}
          </div>
          <p className="text-[11px] text-stone-400">Direct women artisan profiles in Haryana</p>
        </div>

        {/* Catalog Items */}
        <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Live Products
            </span>
            <Package className="w-4 h-4 text-peepal-700" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
            {productsCount}
          </div>
          <p className="text-[11px] text-stone-400">Across 8 craft disciplines</p>
        </div>
      </div>

      {/* Main Row: Recent Orders & Inventory Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders Table (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-stone-200 rounded-sm shadow-xs">
          <div className="p-5 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg font-medium text-charcoal">Recent Patron Orders</h2>
              <p className="text-[11px] text-stone-400">Latest transactions requiring fulfillment</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-terracotta-700 hover:text-terracotta-900 flex items-center space-x-1"
            >
              <span>View All Orders</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sandstone/40 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Order #</th>
                  <th className="py-3 px-4">Patron</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-sandstone/20 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-charcoal">
                      {order.orderNumber}
                    </td>
                    <td className="py-3.5 px-4 text-charcoal">
                      <span className="font-medium block">{order.shippingName}</span>
                      <span className="text-[11px] text-stone-400">{order.shippingCity}</span>
                    </td>
                    <td className="py-3.5 px-4 text-stone-600">
                      {order.items.length} pcs
                    </td>
                    <td className="py-3.5 px-4 font-serif font-medium text-charcoal">
                      {formatPrice(order.total, "INR")}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                          order.fulfillmentStatus === "DELIVERED"
                            ? "bg-emerald-100 text-emerald-800"
                            : order.fulfillmentStatus === "SHIPPED"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {order.fulfillmentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-stone-400 text-[11px]">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-xs text-terracotta-700 hover:text-terracotta-900 font-semibold"
                      >
                        Manage →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Urgency & Fast Actions (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Low Stock Alerts */}
          <div className="bg-white border border-stone-200 rounded-sm p-5 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 text-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h3 className="font-serif text-base font-medium text-charcoal">
                Inventory Alerts
              </h3>
            </div>

            {lowStockProducts.length === 0 ? (
              <p className="text-xs text-stone-500">All products have healthy inventory levels.</p>
            ) : (
              <div className="space-y-3">
                {lowStockProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-2.5 bg-amber-50/60 border border-amber-200/80 rounded-xs text-xs"
                  >
                    <div>
                      <span className="font-medium text-charcoal block truncate max-w-[11rem]">
                        {p.name}
                      </span>
                      <span className="text-[10px] text-stone-500">SKU: {p.sku}</span>
                    </div>
                    <span className="font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full text-[10px]">
                      {p.inventory} left
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2">
              <Link
                href="/admin/inventory"
                className="text-xs text-terracotta-700 hover:text-terracotta-900 font-semibold block text-center"
              >
                Go to Live Inventory Manager →
              </Link>
            </div>
          </div>

          {/* Quick Navigation Panel */}
          <div className="bg-white border border-stone-200 rounded-sm p-5 shadow-xs space-y-3">
            <h3 className="font-serif text-base font-medium text-charcoal">
              Quick Management Shortcuts
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/admin/content"
                className="p-3 bg-sandstone/50 hover:bg-sandstone rounded-xs text-charcoal transition-colors block text-center font-medium"
              >
                Edit Homepage CMS
              </Link>
              <Link
                href="/admin/coupons"
                className="p-3 bg-sandstone/50 hover:bg-sandstone rounded-xs text-charcoal transition-colors block text-center font-medium"
              >
                Manage Discounts
              </Link>
              <Link
                href="/admin/categories"
                className="p-3 bg-sandstone/50 hover:bg-sandstone rounded-xs text-charcoal transition-colors block text-center font-medium"
              >
                Categories
              </Link>
              <Link
                href="/admin/settings"
                className="p-3 bg-sandstone/50 hover:bg-sandstone rounded-xs text-charcoal transition-colors block text-center font-medium"
              >
                Store Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
