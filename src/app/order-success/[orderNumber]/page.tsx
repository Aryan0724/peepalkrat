import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Package, Truck, ShieldCheck, ArrowRight, Printer, Sparkles } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/currency";
import { Button } from "@/components/ui/button";

interface OrderSuccessProps {
  params: { orderNumber: string };
}

export default async function OrderSuccessPage({ params }: OrderSuccessProps) {
  const order = await prisma.order.findUnique({
    where: { orderNumber: params.orderNumber },
    include: {
      items: {
        include: {
          product: {
            include: { maker: true },
          },
        },
      },
    },
  });

  if (!order) notFound();

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Success Header Banner */}
        <div className="bg-white rounded-sm border border-stone-200 p-8 sm:p-12 text-center shadow-card space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 className="w-8 h-8 stroke-1.5" />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-terracotta-700 font-semibold block">
            Order Confirmed & Authenticated
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-light">
            Thank you for participating in opportunity.
          </h1>

          <p className="text-sm text-stone-600 max-w-lg mx-auto font-light leading-relaxed">
            Your order <strong className="font-semibold text-charcoal">{order.orderNumber}</strong> has been registered. Our artisan guild coordinators in Haryana have received your request and are preparing your pieces.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3 text-xs">
            <span className="bg-sandstone/70 px-3 py-1.5 rounded-xs text-charcoal font-medium">
              Payment Status: <strong className="text-emerald-700">{order.paymentStatus}</strong>
            </span>
            <span className="bg-sandstone/70 px-3 py-1.5 rounded-xs text-charcoal font-medium">
              Fulfillment: <strong className="text-terracotta-700">{order.fulfillmentStatus}</strong>
            </span>
            <span className="bg-sandstone/70 px-3 py-1.5 rounded-xs text-charcoal font-medium">
              Method: {order.paymentMethod}
            </span>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-sm border border-stone-200 text-xs space-y-2">
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-charcoal border-b border-stone-100 pb-2">
              Delivery Destination
            </h3>
            <p className="font-medium text-charcoal">{order.shippingName}</p>
            <p className="text-stone-600">{order.shippingAddressLine1}</p>
            {order.shippingAddressLine2 && (
              <p className="text-stone-600">{order.shippingAddressLine2}</p>
            )}
            <p className="text-stone-600">
              {order.shippingCity}, {order.shippingState} - {order.shippingPostalCode}
            </p>
            <p className="text-stone-600">{order.shippingCountry}</p>
            <p className="text-stone-400 pt-1">
              Contact: {order.customerEmail} {order.customerPhone ? `• ${order.customerPhone}` : ""}
            </p>
          </div>

          {/* Tracking & Timeline */}
          <div className="bg-white p-6 rounded-sm border border-stone-200 text-xs space-y-3">
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-charcoal border-b border-stone-100 pb-2">
              Dispatch & Tracking
            </h3>
            <div className="flex items-start space-x-3">
              <Truck className="w-4 h-4 text-terracotta-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-charcoal">Courier Fulfillment</p>
                <p className="text-stone-500 text-[11px]">
                  Carrier: {order.trackingCarrier || "BlueDart Express Pan-India"}
                </p>
                <p className="text-stone-500 text-[11px]">
                  Tracking No: {order.trackingNumber || "Pending workshop dispatch scan"}
                </p>
              </div>
            </div>
            <p className="text-[11px] text-stone-500 leading-relaxed border-t border-stone-100 pt-2">
              Your pieces are packaged with 100% biodegradable honey-comb paper and unbleached cotton ribbon.
            </p>
          </div>
        </div>

        {/* Ordered Items Summary */}
        <div className="bg-white rounded-sm border border-stone-200 p-6 mt-6 space-y-4">
          <h3 className="font-serif text-base font-medium text-charcoal border-b border-stone-100 pb-3">
            Order Items
          </h3>

          <div className="divide-y divide-stone-100">
            {order.items.map((item) => (
              <div key={item.id} className="py-4 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-4">
                  {item.imageUrl && (
                    <div className="relative w-14 h-16 bg-stone-100 rounded-xs overflow-hidden shrink-0 border border-stone-200">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="60px"
                      />
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium text-charcoal text-sm">{item.name}</h4>
                    {item.product?.maker && (
                      <p className="text-terracotta-700 text-xs">
                        Crafted by {item.product.maker.name} • {item.product.productionLocation}
                      </p>
                    )}
                    <p className="text-stone-400 text-xs">Quantity: {item.quantity}</p>
                  </div>
                </div>

                <span className="font-serif text-sm font-semibold text-charcoal">
                  {formatPrice(item.total, "INR")}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-stone-200 pt-4 space-y-2 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-charcoal">{formatPrice(order.subtotal, "INR")}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount ({order.couponCode})</span>
                <span>-{formatPrice(order.discount, "INR")}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="font-medium text-charcoal">
                {order.shippingFee === 0 ? "FREE" : formatPrice(order.shippingFee, "INR")}
              </span>
            </div>
            <div className="border-t border-stone-200 pt-3 flex justify-between text-base font-serif font-semibold text-charcoal">
              <span>Total Paid</span>
              <span className="text-terracotta-700">{formatPrice(order.total, "INR")}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/shop">
            <Button variant="editorial" size="lg" className="w-full sm:w-auto">
              <span>Continue Exploring Crafts</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
          <Link href="/makers">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Meet More Makers
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
