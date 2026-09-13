# PEEPALKRAT — Premium Cultural E-Commerce Platform

> **"For the People. By the People."**
> A modern social-commerce experience rooted in Haryana, India — elevating women artisans, weavers, and craftswomen through dignified commerce, transparent human storytelling, and living wages.

---

## 🌟 Brand & Architectural Vision

PeepalKrat is designed as a **luxury ethical commerce platform** (combining the editorial sensibility of Aesop and Patagonia with contemporary Indian heritage design).
- **Agency > Charity**: The women of Haryana are celebrated as master creators, business leaders, and artists, never as victims or charity recipients.
- **Traceable Provenance**: Every object connects patron to maker: `Person → Craft → Product → Customer`.
- **Global Ready**: Built with an international commerce architecture supporting multi-currency conversion (`INR`, `USD`, `EUR`, `GBP`), localized pricing, and modular payment providers (Simulated, Razorpay for India, and Stripe for international orders).

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Actions, Server Components)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom editorial brand tokens (`terracotta`, `khadi`, `sandstone`, `peepal`, `charcoal`, `mustard`)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Database & ORM**: [Prisma ORM](https://www.prisma.io/)
  - *Local zero-config*: SQLite (`dev.db`)
  - *Production ready*: PostgreSQL (Supabase / Neon / RDS) via `.env`
- **Security & Auth**: Secure cookie-based JWT session authentication (`jose`) with `bcryptjs` password hashing and middleware route protection.

---

## 🚀 Quick Start & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Database & Seed Realistic Demo Catalog
```bash
# Push Prisma schema to database
npx prisma db push

# Seed 20+ Haryana artisan products, 8 makers, categories, orders, and coupons
npm run db:seed
```

### 3. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the storefront.

---

## 🔐 Administrative Operations Console

The platform includes a dedicated, responsive administrative operations console:
- **URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Staff Login**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Default Seeded Credentials**:
  - **Email**: `admin@peepalkrat.com`
  - **Password**: `PeepalKrat@2026!`

### Admin Modules:
1. **Overview (`/admin`)**: Live gross revenue, order volume, average order value, low-stock inventory alerts, and recent orders.
2. **Products (`/admin/products`)**: Comprehensive catalog CRUD with variant pricing, imagery, story snippets, impact notes, and artisan attribution.
3. **Makers (`/admin/makers`)**: Women artisan profile CMS with village/district locations, biographies, direct quotes, and verified social impact metrics.
4. **Orders & Fulfillment (`/admin/orders`)**: Lifecycle management (`PENDING` → `PROCESSING` → `PACKED` → `SHIPPED` → `DELIVERED`), air waybill tracking assignment, and printable packing slips.
5. **Inventory (`/admin/inventory`)**: Real-time stock counters with inline adjustments and low-stock alerts.
6. **Categories & Collections (`/admin/categories`, `/admin/collections`)**: Dynamic taxonomy and thematic curation manager.
7. **Patron Network (`/admin/customers`)**: Customer lifetime value and order histories.
8. **Promotions (`/admin/coupons`)**: Percentage or fixed-amount promotional codes (e.g. `WELCOME10`, `HARYANAHERITAGE`).
9. **Visual CMS (`/admin/content`)**: Allows non-technical staff to change hero copy, announcement bars, and certified statistics without code edits.
10. **Store Settings (`/admin/settings`)**: Multi-currency exchange rates, shipping tiers, and contact information.

---

## 🌏 International Commerce & Payments

The checkout experience (`/checkout`) utilizes a pluggable payment adapter (`src/lib/payments/payment-adapter.ts`):
- **SIMULATED**: Default high-fidelity mock gateway allowing friction-free end-to-end order placement and testing.
- **RAZORPAY**: Seamless Indian payments via UPI (GPay, PhonePe, Paytm), NetBanking, and Indian Debit/Credit cards.
- **STRIPE**: Global card processing for international patrons in USD, EUR, and GBP.
- **CASH ON DELIVERY (COD)**: Doorstep cash settlement across domestic pincodes.

To enable live gateway keys in production, supply credentials in `.env`:
```env
PAYMENT_PROVIDER="razorpay"
RAZORPAY_KEY_ID="rzp_live_..."
RAZORPAY_KEY_SECRET="..."

STRIPE_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
```

---

## 📦 Production Deployment (Vercel & PostgreSQL)

1. Set `DATABASE_URL` in `.env` to your PostgreSQL database connection string (e.g. Neon, Supabase, or AWS RDS):
   ```env
   DATABASE_URL="postgresql://username:password@ep-cold-lake.neon.tech/peepalkrat?sslmode=require"
   ```
2. Update `provider = "postgresql"` in `prisma/schema.prisma`.
3. Run `npx prisma db push && npm run db:seed`.
4. Deploy the repository to **Vercel** with one click.
