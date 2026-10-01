"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Save, Truck, Printer, CheckCircle2, ShieldCheck } from "lucide-react";
import { formatPrice } from "@/lib/currency";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface OrderDetailProps {
  order: any;
}

export function OrderDetailClient({ order }: OrderDetailProps) {
  const router = useRouter();

  const [fulfillmentStatus, setFulfillmentStatus] = useState(order.fulfillmentStatus);
  const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus);
  const [trackingCarrier, setTrackingCarrier] = useState(order.trackingCarrier || "BlueDart Express");
  const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber || "");
  const [notes, setNotes] = useState(order.notes || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setStatusMessage(null);

    try {
      const res = await fetch(`/api/admin/orders/${order.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fulfillmentStatus,
          paymentStatus,
          trackingCarrier,
          trackingNumber,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed updating order");
      }

      setStatusMessage("Order status and tracking updated successfully!");
      router.refresh();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/orders"
            className="p-1.5 rounded-sm hover:bg-stone-200 text-stone-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl text-charcoal font-normal">
              Order {order.orderNumber}
            </h1>
            <p className="text-xs text-stone-500">
              Placed on {formatDate(order.createdAt)} • Via {order.paymentMethod}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="text-xs flex items-center space-x-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Packing Slip</span>
          </Button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-sm text-xs">
          {statusMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Items & Customer (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Order Items Table */}
          <div className="bg-white rounded-sm border border-stone-200 shadow-xs p-6 space-y-4">
            <h2 className="font-serif text-base font-medium text-charcoal border-b border-stone-100 pb-3">
              Order Items ({order.items.length})
            </h2>

            <div className="divide-y divide-stone-100">
              {order.items.map((item: any) => (
                <div key={item.id} className="py-4 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-4">
                    {item.imageUrl && (
                      <div className="relative w-14 h-16 bg-stone-100 rounded-xs overflow-hidden shrink-0 border border-stone-200">
                        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="60px" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium text-charcoal text-sm">{item.name}</h4>
                      <p className="text-stone-400 text-xs">SKU: {item.sku || "PG-DEFAULT"}</p>
                      <p className="text-stone-500 text-xs mt-0.5">
                        {formatPrice(item.price, "INR")} x {item.quantity}
                      </p>
                    </div>
                  </div>

                  <span className="font-serif text-sm font-semibold text-charcoal">
                    {formatPrice(item.total, "INR")}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Breakdown */}
            <div className="border-t border-stone-200 pt-4 space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-charcoal">{formatPrice(order.subtotal, "INR")}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount ({order.couponCode || "Coupon"})</span>
                  <span>-{formatPrice(order.discount, "INR")}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="font-medium text-charcoal">
                  {order.shippingFee === 0 ? "FREE" : formatPrice(order.shippingFee, "INR")}
                </span>
              </div>
              <div className="border-t border-stone-200 pt-2 flex justify-between text-base font-serif font-semibold text-charcoal">
                <span>Total Amount</span>
                <span className="text-terracotta-700">{formatPrice(order.total, "INR")}</span>
              </div>
            </div>
          </div>

          {/* Customer & Shipping Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-2 text-xs">
              <h3 className="font-serif text-sm font-semibold text-charcoal border-b border-stone-100 pb-2">
                Customer Details
              </h3>
              <p className="font-semibold text-charcoal">{order.shippingName}</p>
              <p className="text-stone-600">{order.customerEmail}</p>
              {order.customerPhone && <p className="text-stone-600">{order.customerPhone}</p>}
            </div>

            <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-2 text-xs">
              <h3 className="font-serif text-sm font-semibold text-charcoal border-b border-stone-100 pb-2">
                Shipping Address
              </h3>
              <p className="text-stone-700">{order.shippingAddressLine1}</p>
              {order.shippingAddressLine2 && <p className="text-stone-700">{order.shippingAddressLine2}</p>}
              <p className="text-stone-700">
                {order.shippingCity}, {order.shippingState} - {order.shippingPostalCode}
              </p>
              <p className="text-stone-700">{order.shippingCountry}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Status & Tracking Controller (4 cols) */}
        <div className="lg:col-span-4">
          <form onSubmit={handleUpdate} className="bg-white p-6 rounded-sm border border-stone-200 shadow-xs space-y-5 text-xs">
            <h3 className="font-serif text-base font-medium text-charcoal border-b border-stone-100 pb-3">
              Fulfillment & Dispatch Controls
            </h3>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">Fulfillment Status</label>
              <select
                value={fulfillmentStatus}
                onChange={(e) => setFulfillmentStatus(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-sm bg-white font-medium"
              >
                <option value="PENDING">Pending (New Order)</option>
                <option value="PROCESSING">Processing (Artisan Packing)</option>
                <option value="PACKED">Packed (Awaiting Courier)</option>
                <option value="SHIPPED">Shipped (In Transit)</option>
                <option value="DELIVERED">Delivered to Patron</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">Payment Status</label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-sm bg-white font-medium"
              >
                <option value="PAID">PAID</option>
                <option value="PENDING">PENDING</option>
                <option value="REFUNDED">REFUNDED</option>
                <option value="FAILED">FAILED</option>
              </select>
            </div>

            <div className="pt-2 border-t border-stone-100 space-y-3">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Assigned Courier / Carrier</label>
                <select
                  value={trackingCarrier}
                  onChange={(e) => setTrackingCarrier(e.target.value)}
                  className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
                >
                  <option value="BlueDart Express">BlueDart Express (Domestic)</option>
                  <option value="Delhivery">Delhivery Surface/Air</option>
                  <option value="India Post Speed Post">India Post Speed Post</option>
                  <option value="DTDC Express">DTDC Express</option>
                  <option value="DHL Express International">DHL Express International</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Air Waybill / Tracking Number</label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="e.g. BLU-98218721"
                  className="w-full p-2.5 border border-stone-300 rounded-sm font-mono uppercase bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">Staff Fulfillment Notes</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Internal packaging checks, artisan thank you note included..."
                className="w-full p-2.5 border border-stone-300 rounded-sm bg-white"
              />
            </div>

            <Button
              type="submit"
              variant="editorial"
              size="sm"
              disabled={isUpdating}
              className="w-full h-11 text-xs"
            >
              <Save className="w-3.5 h-3.5 mr-1.5" />
              <span>{isUpdating ? "Updating Order..." : "Update Order & Tracking"}</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
