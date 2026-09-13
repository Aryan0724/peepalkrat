import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { PaymentAdapter } from "@/lib/payments/payment-adapter";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, customer, shippingAddress, paymentMethod, couponCode, currency } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "No items provided in order." },
        { status: 400 }
      );
    }

    if (!customer?.email || !customer?.name || !shippingAddress?.line1 || !shippingAddress?.city) {
      return NextResponse.json(
        { success: false, message: "Missing required customer or shipping details." },
        { status: 400 }
      );
    }

    // 1. Calculate actual subtotal from DB
    let subtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        include: { images: { take: 1 } },
      });

      if (!product) {
        return NextResponse.json(
          { success: false, message: `Product ${item.name} not found.` },
          { status: 404 }
        );
      }

      let price = product.price;
      if (item.variantId) {
        const variant = await prisma.productVariant.findUnique({
          where: { id: item.variantId },
        });
        if (variant && variant.price) {
          price = variant.price;
        }
      }

      const itemTotal = price * item.quantity;
      subtotal += itemTotal;

      validatedItems.push({
        productId: product.id,
        variantId: item.variantId || null,
        name: product.name,
        sku: product.sku,
        price,
        quantity: item.quantity,
        total: itemTotal,
        imageUrl: product.images[0]?.url || null,
      });
    }

    // 2. Validate coupon if provided
    let discount = 0;
    let validatedCouponCode: string | null = null;

    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.trim().toUpperCase() },
      });

      if (coupon && coupon.isActive) {
        if (subtotal >= coupon.minOrderValue) {
          validatedCouponCode = coupon.code;
          if (coupon.discountType === "PERCENTAGE") {
            discount = (subtotal * coupon.discountValue) / 100;
            if (coupon.maxDiscount && discount > coupon.maxDiscount) {
              discount = coupon.maxDiscount;
            }
          } else {
            discount = coupon.discountValue;
          }
          // Increment coupon usage count
          await prisma.coupon.update({
            where: { id: coupon.id },
            data: { usageCount: { increment: 1 } },
          });
        }
      }
    }

    // 3. Shipping Fee
    const shippingFee = subtotal >= 2000 ? 0 : 150;
    const total = Math.max(0, subtotal - discount + shippingFee);

    // 4. Generate Order Number
    const orderNumber = `PG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // 5. Create or connect Customer
    let customerRecord = await prisma.customer.findUnique({
      where: { email: customer.email },
    });

    const [firstName, ...restName] = customer.name.split(" ");
    const lastName = restName.join(" ") || firstName;

    if (!customerRecord) {
      customerRecord = await prisma.customer.create({
        data: {
          email: customer.email,
          phone: customer.phone || null,
          firstName,
          lastName,
          totalSpent: total,
          ordersCount: 1,
          addresses: {
            create: {
              fullName: customer.name,
              phone: customer.phone || null,
              line1: shippingAddress.line1,
              line2: shippingAddress.line2 || null,
              city: shippingAddress.city,
              state: shippingAddress.state || "Haryana",
              postalCode: shippingAddress.postalCode,
              country: shippingAddress.country || "India",
              isDefault: true,
            },
          },
        },
      });
    } else {
      await prisma.customer.update({
        where: { id: customerRecord.id },
        data: {
          totalSpent: { increment: total },
          ordersCount: { increment: 1 },
        },
      });
    }

    // 6. Invoke Payment Gateway Adapter
    const paymentResult = await PaymentAdapter.createPaymentIntent({
      orderId: orderNumber,
      orderNumber,
      amount: total,
      currency: currency || "INR",
      customerEmail: customer.email,
      customerPhone: customer.phone,
      customerName: customer.name,
      provider: paymentMethod || "SIMULATED",
    });

    // 7. Create Order in Database
    const createdOrder = await prisma.order.create({
      data: {
        orderNumber,
        customerId: customerRecord.id,
        customerEmail: customer.email,
        customerPhone: customer.phone || null,
        shippingName: customer.name,
        shippingAddressLine1: shippingAddress.line1,
        shippingAddressLine2: shippingAddress.line2 || null,
        shippingCity: shippingAddress.city,
        shippingState: shippingAddress.state || "Haryana",
        shippingPostalCode: shippingAddress.postalCode,
        shippingCountry: shippingAddress.country || "India",
        subtotal,
        discount,
        couponCode: validatedCouponCode,
        tax: 0,
        shippingFee,
        total,
        currency: currency || "INR",
        paymentMethod: paymentResult.provider,
        paymentStatus: paymentResult.status,
        paymentReference: paymentResult.paymentReference,
        fulfillmentStatus: "PROCESSING",
        items: {
          create: validatedItems,
        },
      },
    });

    // 8. Decrement inventory for products
    for (const item of validatedItems) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { inventory: { decrement: item.quantity } },
      });
      if (item.variantId) {
        await prisma.productVariant.update({
          where: { id: item.variantId },
          data: { inventory: { decrement: item.quantity } },
        });
      }
    }

    return NextResponse.json({
      success: true,
      orderNumber: createdOrder.orderNumber,
      orderId: createdOrder.id,
      paymentResult,
    });
  } catch (error: any) {
    console.error("Checkout order creation error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed creating order." },
      { status: 500 }
    );
  }
}
