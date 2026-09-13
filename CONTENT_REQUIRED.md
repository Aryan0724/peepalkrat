# CONTENT_REQUIRED — PeepalKrat Client Assets & Verification Checklist

This document details the real assets, legal records, and certified information required from the **PeepalKrat** leadership and ground team in Haryana before public launch.

All CMS and database fields are already implemented and ready to receive these verified items directly through the Admin Console (`/admin`).

---

## 1. Women Maker & Artisan Profiles (`/admin/makers`)
- [ ] **High-Resolution Photography**: Authentic, dignified photographs of women artisans in their village workshops or home pit-loom settings (preferred minimum: 1200 x 1600px portrait).
- [ ] **Verified Names & Village Locations**: Exact village, block, and district names across Haryana (e.g., Sondhapur, Panipat; Bohar, Rohtak; Chhuchhakwas, Jhajjar).
- [ ] **Direct Quotes & Personal Narratives**: Real artisan statements regarding their craft heritage, apprentice training, and autonomy.
- [ ] **Verified Impact Metrics**:
  - Exact years of heritage craft practice.
  - Number of apprentice women trained in each cluster.
  - Documented average household income resilience percentage.
- [ ] **Optional Short Video Clips**: 10–30 second clips of weaving shuttles, needlework, clay throwing, or grass braiding for product and maker pages.

---

## 2. Product Catalog Data (`/admin/products`)
- [ ] **High-Resolution Product Photography**: Editorial studio and in-situ lifestyle imagery of each piece (minimum 2–4 angles: front, angle, reverse weave texture, packaging).
- [ ] **Accurate Physical Specifications**: Exact length x width x height (cm/inches), weight (grams/kg), and exact material blend (e.g., 70% Desi Cotton / 30% Native Wool).
- [ ] **Specific Village of Origin**: Tagging each SKU to its specific Haryana production cluster.
- [ ] **Care & Maintenance Instructions**: Specific cleaning, washing, or polishing guidelines for cotton, silk, terracotta, and brass.

---

## 3. Brand Assets & Storytelling (`/admin/content`)
- [ ] **Official Vector Brand Mark / Logo**: High-res SVG / PNG transparency for header and packing seals.
- [ ] **Founding Narrative & Leadership Letter**: Official mission statement from PeepalKrat founders.
- [ ] **Government / Cooperative Certifications**: Any Handloom Mark, Silk Mark, or registered self-help group (SHG) enterprise registration numbers.

---

## 4. Payment & Banking Integrations (`.env` / Admin Settings)
- [ ] **Razorpay Account Credentials**:
  - `RAZORPAY_KEY_ID`
  - `RAZORPAY_KEY_SECRET`
  - Webhook secret for automated payment settlement notifications.
- [ ] **Stripe International Credentials** (for USD/EUR/GBP international checkout):
  - `STRIPE_SECRET_KEY`
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- [ ] **GST / Tax Information**: Registered GSTIN number and state tax classification for invoice generation.

---

## 5. Courier & Dispatch Integrations
- [ ] **Courier API Account**: BlueDart, Delhivery, or Shiprocket API keys for automated air waybill (AWB) generation and live tracking updates.
- [ ] **Packaging Specifications**: Certification notes for 100% biodegradable honey-comb paper and recycled cotton pouches.
