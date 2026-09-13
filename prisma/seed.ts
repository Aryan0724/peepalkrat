import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting PeepalKrat database seed...");

  // 1. Clean existing records (in dependency order)
  await prisma.review.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.cartItem.deleteMany({});
  await prisma.cart.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.collection.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.maker.deleteMany({});
  await prisma.address.deleteMany({});
  await prisma.customer.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.coupon.deleteMany({});
  await prisma.contentBlock.deleteMany({});
  await prisma.siteSetting.deleteMany({});

  console.log("🧹 Cleaned existing database records.");

  // 2. Seed Admin and Staff Users
  const adminPasswordHash = await bcrypt.hash("PeepalKrat@2026!", 10);
  const staffPasswordHash = await bcrypt.hash("StaffGrat@2026!", 10);

  const admin = await prisma.user.create({
    data: {
      email: "admin@peepalkrat.com",
      passwordHash: adminPasswordHash,
      name: "PeepalKrat Lead Administrator",
      role: "ADMIN",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    },
  });

  await prisma.user.create({
    data: {
      email: "staff@peepalkrat.com",
      passwordHash: staffPasswordHash,
      name: "Operations Coordinator",
      role: "STAFF",
    },
  });

  console.log("👤 Created Admin user: admin@peepalkrat.com (Password: PeepalKrat@2026!)");

  // 3. Seed Makers (Dignified Women Artisans of Haryana)
  const makers = await Promise.all([
    prisma.maker.create({
      data: {
        name: "Sunita Devi",
        slug: "sunita-devi",
        title: "Master Dhurrie & Kilim Weaver",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
        villageDistrict: "Panipat, Haryana",
        craftSkill: "Upcycled Cotton & Raw Wool Handloom Weaving",
        biography: "Sunita leads a collective of 18 women weavers in rural Panipat. Having learned the pit-loom from her grandmother, she has transformed traditional Panipat geometric flat-weaves into modern interior masterpieces, creating self-reliant incomes for her entire group.",
        quote: "We do not simply push shuttles of thread; we weave our autonomy into every yard of fabric.",
        verifiedImpactData: JSON.stringify({
          yearsPracticing: 19,
          womenTrained: 28,
          averageIncomeIncreasePct: 140,
          sustainableYarnUsedPct: 100,
        }),
        isFeatured: true,
      },
    }),
    prisma.maker.create({
      data: {
        name: "Santosh Kumari",
        slug: "santosh-kumari",
        title: "Heirloom Phulkari Needle Artisan",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
        villageDistrict: "Rohtak, Haryana",
        craftSkill: "Resham Silk Darning Stitch Embroidery",
        biography: "Santosh works from her village in Rohtak, reviving near-lost geometric Phulkari patterns on unbleached khadi. She trains young women after school, providing them with technical stitching skills and financial accounts.",
        quote: "When needle meets raw cotton with patience, the heritage of Haryana breathes anew.",
        verifiedImpactData: JSON.stringify({
          yearsPracticing: 24,
          womenTrained: 42,
          averageIncomeIncreasePct: 180,
          childrenEducated: 3,
        }),
        isFeatured: true,
      },
    }),
    prisma.maker.create({
      data: {
        name: "Kamlesh Rani",
        slug: "kamlesh-rani",
        title: "Botanical Grass & Moonj Craftswoman",
        photo: "https://images.unsplash.com/photo-1580894732488-8eeec526b71f?auto=format&fit=crop&w=600&q=80",
        villageDistrict: "Jhajjar, Haryana",
        craftSkill: "Wild Moonj & Sarkanda Grass Braiding",
        biography: "Kamlesh harvests wild Moonj grass from the seasonal banks of Haryana canals, curing and hand-twisting them into sculptural, zero-waste home storage baskets and placemats. She directs a local women's enterprise of 12 artisans.",
        quote: "Nature gives us the raw grass for free. Our hands give it purpose and dignity.",
        verifiedImpactData: JSON.stringify({
          yearsPracticing: 14,
          womenTrained: 16,
          plasticReplacedKg: 850,
        }),
        isFeatured: true,
      },
    }),
    prisma.maker.create({
      data: {
        name: "Rekha Sharma",
        slug: "rekha-sharma",
        title: "Studio Earthen Potter & Sculptor",
        photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80",
        villageDistrict: "Jind, Haryana",
        craftSkill: "Wheel-Thrown Terracotta & Clay Burnishing",
        biography: "Breaking traditional male-dominated pottery conventions, Rekha learned wheel throwing and established the first women-operated earthenware studio in Jind, producing lead-free, mineral-rich culinary and botanical ceramics.",
        quote: "Earth has no gender; the clay responds only to the devotion of your touch.",
        verifiedImpactData: JSON.stringify({
          yearsPracticing: 11,
          womenTrained: 14,
          ecoFriendlyKiln: true,
        }),
        isFeatured: true,
      },
    }),
    prisma.maker.create({
      data: {
        name: "Meena Bai",
        slug: "meena-bai",
        title: "Lacquered Wood & Kikar Artisan",
        photo: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=600&q=80",
        villageDistrict: "Rewari, Haryana",
        craftSkill: "Lathe Wood Turning & Natural Resin Lacquering",
        biography: "Working with ethically pruned Kikar and Sheesham wood in Rewari, Meena designs tactile, food-safe wooden tableware, spice chests, and decorative vessels coated with herbal non-toxic lacquers.",
        quote: "A fallen branch is not firewood to us; it is a canvas waiting for a family's table.",
        verifiedImpactData: {
          yearsPracticing: 16,
          womenTrained: 19,
          sustainableTimberSource: "Pruned local Kikar & Sheesham",
        }.toString(),
        isFeatured: false,
      },
    }),
    prisma.maker.create({
      data: {
        name: "Anita Verma",
        slug: "anita-verma",
        title: "Handspun Khadi Weaver & Tailor",
        photo: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=80",
        villageDistrict: "Bhiwani, Haryana",
        craftSkill: "Amber Charkha Spinning & Natural Indigo Dyeing",
        biography: "Anita champions pesticide-free, solar-spun desi cotton fabrics in Bhiwani. Her garments honor traditional Haryanvi cuts while adapting to minimalist global silhouettes.",
        quote: "Real luxury is breathable, honest, and leaves no poison in our groundwater.",
        verifiedImpactData: JSON.stringify({
          yearsPracticing: 12,
          womenTrained: 22,
        }),
        isFeatured: false,
      },
    }),
    prisma.maker.create({
      data: {
        name: "Bimla Devi",
        slug: "bimla-devi",
        title: "Bell Metal & Hammered Brass Crafter",
        photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
        villageDistrict: "Rewari, Haryana",
        craftSkill: "Traditional Cold-Hammered Brassware",
        biography: "Rewari has been celebrated for centuries as the Brass City. Bimla is among the pioneering women co-running an artisanal foundry crafting solid brass urlis, lamps, and serveware.",
        quote: "Metal outlasts our lifetimes. The care we stamp into it echoes across generations.",
        verifiedImpactData: JSON.stringify({
          yearsPracticing: 21,
          womenTrained: 15,
        }),
        isFeatured: false,
      },
    }),
    prisma.maker.create({
      data: {
        name: "Rajwati Gurjar",
        slug: "rajwati-gurjar",
        title: "Pure Wool Artisan & Shawl Finisher",
        photo: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=600&q=80",
        villageDistrict: "Karnal, Haryana",
        craftSkill: "Indigenous Wool Spinning & Border Needlework",
        biography: "Rajwati works with native pastoral sheep wool from Northern Haryana, blending it with soft mulberry silks to craft warmth-retaining winter wraps and throws.",
        quote: "Every thread is a shield against the winter chill and an invitation to slow living.",
        verifiedImpactData: JSON.stringify({
          yearsPracticing: 17,
          womenTrained: 25,
        }),
        isFeatured: false,
      },
    }),
  ]);

  console.log(`👩‍🎨 Seeded ${makers.length} dignified women makers.`);

  // 4. Seed Categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Handloom Weaves & Rugs",
        slug: "handloom-weaves",
        description: "Heritage dhurries, kilims, and tactile floor rugs handwoven on traditional Panipat looms.",
        image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80",
      },
    }),
    prisma.category.create({
      data: {
        name: "Heirloom Phulkari & Embroidery",
        slug: "phulkari-embroidery",
        description: "Geometrical darning stitch needlework on fine cotton and tussar silk textiles.",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      },
    }),
    prisma.category.create({
      data: {
        name: "Moonj & Botanical Grasscraft",
        slug: "moonj-grasscraft",
        description: "Zero-waste sculptural storage, hand-plaited planters, and table baskets from wild Haryana grasses.",
        image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80",
      },
    }),
    prisma.category.create({
      data: {
        name: "Earthen Pottery & Ceramics",
        slug: "earthen-pottery",
        description: "Mineral-rich, wheel-thrown terracotta carafes, kulhad sets, and clay serving platters.",
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
      },
    }),
    prisma.category.create({
      data: {
        name: "Lacquered Wood & Serveware",
        slug: "woodcraft-serveware",
        description: "Sustainably harvested local Kikar and Sheesham wood carved and naturally lacquered for the modern home.",
        image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80",
      },
    }),
    prisma.category.create({
      data: {
        name: "Brassware & Metal Accents",
        slug: "brassware-accents",
        description: "Hand-hammered brass vessels, architectural urlis, and festive oil lamps from historic Rewari foundries.",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
      },
    }),
    prisma.category.create({
      data: {
        name: "Khadi Apparel & Wraps",
        slug: "khadi-apparel",
        description: "Solar-spun breathable organic cotton kurtas, lightweight jackets, and pure wool shawls.",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
      },
    }),
    prisma.category.create({
      data: {
        name: "Conscious Living & Gift Boxes",
        slug: "gift-boxes-living",
        description: "Curated gift bundles celebrating the makers of Haryana with artisanal teas, textiles, and pottery.",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
      },
    }),
  ]);

  console.log(`📁 Seeded ${categories.length} categories.`);

  // 5. Seed Curated Collections
  const collections = await Promise.all([
    prisma.collection.create({
      data: {
        name: "Panipat Heritage Weaves",
        slug: "panipat-heritage-weaves",
        description: "Architectural geometric dhurries and tactile handloom throws woven with recycled and natural yarns.",
        image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80",
        bannerImage: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1600&q=80",
        isFeatured: true,
      },
    }),
    prisma.collection.create({
      data: {
        name: "The Rohtak Clay Studio",
        slug: "rohtak-clay-studio",
        description: "Warm terracotta and burnished earthen vessels celebrating the quiet beauty of Haryana clay.",
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80",
        bannerImage: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1600&q=80",
        isFeatured: true,
      },
    }),
    prisma.collection.create({
      data: {
        name: "The Moonj Grass Botanical Series",
        slug: "moonj-botanical-series",
        description: "Sculptural, durable home baskets hand-twisted from canal wild grass. 100% biodegradable.",
        image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=1200&q=80",
        isFeatured: true,
      },
    }),
    prisma.collection.create({
      data: {
        name: "Festive Phulkari Heirloom",
        slug: "festive-phulkari",
        description: "Intricate geometric silk floss embroidery on midnight and terracotta unbleached cotton.",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
        isFeatured: true,
      },
    }),
    prisma.collection.create({
      data: {
        name: "Everyday Conscious Living",
        slug: "everyday-conscious-living",
        description: "Mindfully made essentials for a warm, grounded, plastic-free home.",
        image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80",
        isFeatured: false,
      },
    }),
    prisma.collection.create({
      data: {
        name: "New Arrivals: Winter Hearth",
        slug: "winter-hearth",
        description: "Heavy textured wool blankets, brass warmers, and tea service ceramics.",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
        isFeatured: true,
      },
    }),
  ]);

  console.log(`🏷️ Seeded ${collections.length} curated collections.`);

  // 6. Seed 26 Realistic Products with Storytelling, Makers, and Variants
  const productsData = [
    {
      sku: "PG-TX-001",
      name: "Sohna Geometric Handloom Dhurrie",
      slug: "sohna-geometric-handloom-dhurrie",
      description: "Handcrafted in the renowned weaving heart of Panipat, this reversible flat-weave dhurrie combines unbleached organic cotton with earthy terracotta and charcoal wool. Woven on traditional pit-looms by Sunita Devi and her artisan cluster, each line reflects architectural balance and heirloom durability.",
      shortDescription: "Reversible flat-weave cotton and wool floor dhurrie crafted on Panipat pit-looms.",
      price: 4850,
      compareAtPrice: 5900,
      currency: "INR",
      categoryIndex: 0,
      collectionIndex: 0,
      makerIndex: 0,
      tags: "dhurrie,handloom,panipat,rug,living room,reversible",
      isFeatured: true,
      inventory: 14,
      material: "70% Recycled Desi Cotton, 30% Native Haryana Wool",
      dimensions: "4 ft x 6 ft (120 cm x 180 cm)",
      weight: "3.2 kg",
      careInstructions: "Spot clean with damp cloth or gentle dry clean. Rotate seasonally.",
      shippingInfo: "Ships plastic-free in 48 hours. Express delivery available across India.",
      productionLocation: "Sondhapur Village, Panipat, Haryana",
      storySnippet: "Sunita spent 28 hours setting up the vertical warp threads. The geometric interlocking motif is an homage to the ancient agricultural canals of northern Haryana.",
      impactNotes: "Directly funds 6 days of living wage for two female apprentice weavers in Panipat.",
      images: [
        { url: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=900&q=80", alt: "Sohna Handloom Dhurrie folded on neutral wooden bench", isPrimary: true },
        { url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=900&q=80", alt: "Close-up texture of geometric cotton and wool weave", isPrimary: false },
      ],
      variants: [
        { name: "Medium (4x6 ft)", size: "4x6 ft", price: 4850, inventory: 10 },
        { name: "Large (5x8 ft)", size: "5x8 ft", price: 7450, compareAtPrice: 8900, inventory: 4 },
      ]
    },
    {
      sku: "PG-EMB-002",
      name: "Bagh Resham Embroidered Silk Stole",
      slug: "bagh-resham-embroidered-silk-stole",
      description: "An homage to the magnificent Bagh tradition of Haryana. Hand-embroidered with untwisted silk floss (pat) over a handspun khadi base, this masterpiece features a dense floral diamond network worked entirely from the reverse side using counted thread darning stitches.",
      shortDescription: "Counted-stitch silk floss heirloom stole hand-embroidered by Santosh Kumari.",
      price: 6200,
      compareAtPrice: 7500,
      currency: "INR",
      categoryIndex: 1,
      collectionIndex: 3,
      makerIndex: 1,
      tags: "phulkari,bagh,embroidery,silk,stole,shawl,heirloom",
      isFeatured: true,
      inventory: 8,
      material: "Handspun desi cotton base, 100% natural mulberry floss silk thread",
      dimensions: "78 inches x 28 inches (200 cm x 70 cm)",
      weight: "340 g",
      careInstructions: "Dry clean only. Store wrapped in pure cotton muslin away from moisture.",
      shippingInfo: "Dispatched in handcrafted recycled kraft gift box with maker's certificate.",
      productionLocation: "Bohar Village, Rohtak, Haryana",
      storySnippet: "Master artisan Santosh Kumari worked on this piece over 34 evening sessions under warm village lamplight, counting threads without a single traced stencil.",
      impactNotes: "Provides 3 weeks of supplementary education support for young women artisans in Rohtak.",
      images: [
        { url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80", alt: "Intricate Phulkari embroidered textile close up", isPrimary: true },
        { url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80", alt: "Phulkari stole draped elegantly", isPrimary: false },
      ],
      variants: [
        { name: "Mustard Gold & Crimson", color: "Mustard Gold", price: 6200, inventory: 5 },
        { name: "Midnight Charcoal & Rust", color: "Charcoal Rust", price: 6400, inventory: 3 },
      ]
    },
    {
      sku: "PG-GRS-003",
      name: "Jhajjar Moonj Hand-Braided Storage Urn",
      slug: "jhajjar-moonj-hand-braided-storage-urn",
      description: "Woven entirely from wild riverbed Moonj and Sarkanda reed stalks, this sculptural lidded urn functions as laundry storage, botanical planter, or statement interior accent. Naturally water-resistant, pest-deterrent, and 100% compostable.",
      shortDescription: "Sculptural wild grass storage basket with lid, hand-plaited in Jhajjar.",
      price: 2450,
      compareAtPrice: 2950,
      currency: "INR",
      categoryIndex: 2,
      collectionIndex: 2,
      makerIndex: 2,
      tags: "moonj,basketry,sustainable,zero-waste,storage,planter",
      isFeatured: true,
      inventory: 22,
      material: "Wild harvested Moonj grass, natural cotton cord bind",
      dimensions: "18 inches height x 14 inches diameter (45 cm x 35 cm)",
      weight: "1.4 kg",
      careInstructions: "Wipe with dry microfiber cloth. Sun-dry for 1 hour every 6 months to maintain grass freshness.",
      shippingInfo: "Rigid corrugated cardboard packaging with zero bubblewrap.",
      productionLocation: "Chhuchhakwas, Jhajjar, Haryana",
      storySnippet: "Kamlesh Rani and her team harvest the grass after the monsoon rains when stalks are supple. Every knot is pulled by hand using wooden awls.",
      impactNotes: "Replaces plastic containers while establishing steady off-season agricultural income.",
      images: [
        { url: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=900&q=80", alt: "Natural braided Moonj grass basket with lid", isPrimary: true },
        { url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80", alt: "Detail of organic grass weave texture", isPrimary: false },
      ],
      variants: [
        { name: "Standard (18 inch)", size: "18 inch", price: 2450, inventory: 15 },
        { name: "Tall (24 inch)", size: "24 inch", price: 3250, inventory: 7 },
      ]
    },
    {
      sku: "PG-POT-004",
      name: "Jind Burnished Terracotta Water Carafe & Tumbler",
      slug: "jind-burnished-terracotta-carafe-tumbler",
      description: "Throw on Rekha Sharma's electric studio wheel in Jind, this mineral-rich clay carafe cools water naturally through microscopic evaporative pores. Burnished with smooth river pebbles before low-temperature wood firing for a gentle metallic terracotta sheen.",
      shortDescription: "Wheel-thrown earthenware jug and drinking cup with natural cooling properties.",
      price: 1650,
      compareAtPrice: 1950,
      currency: "INR",
      categoryIndex: 3,
      collectionIndex: 1,
      makerIndex: 3,
      tags: "terracotta,pottery,carafe,water,kitchenware,earthenware",
      isFeatured: true,
      inventory: 30,
      material: "Lead-free Haryana clay, river silt, natural herbal slip",
      dimensions: "Carafe: 10 in high (1.5 L), Tumbler: 4 in high (280 ml)",
      weight: "1.1 kg",
      careInstructions: "Rinse with lukewarm water and lemon rind. Do not use chemical detergents.",
      shippingInfo: "Padded in molded biodegradable pulp shells to ensure break-free transit.",
      productionLocation: "Uchana, Jind, Haryana",
      storySnippet: "Rekha burnishes each piece for 45 minutes using smooth stones collected from dry riverbeds. This seals the clay without chemical glazes.",
      impactNotes: "Supports clean firing technology in rural pottery communities.",
      images: [
        { url: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80", alt: "Earthen terracotta carafe and cup on stone counter", isPrimary: true },
        { url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80", alt: "Handcrafted rustic clay cup detail", isPrimary: false },
      ],
      variants: [
        { name: "Single Set (Carafe + 1 Tumbler)", price: 1650, inventory: 20 },
        { name: "Family Set (Carafe + 4 Tumblers)", price: 2450, inventory: 10 },
      ]
    },
    {
      sku: "PG-WD-005",
      name: "Rewari Turned Kikar Wood Spice Box (Masala Dabba)",
      slug: "rewari-turned-kikar-wood-spice-box",
      description: "Turned on traditional wood lathes by Meena Bai, this heirloom masala dabba is crafted from fallen native Kikar timber. Houses seven interlocking circular spice bowls and a hand-carved tasting spoon, sealed with food-grade beeswax.",
      shortDescription: "Lathe-turned native hardwood spice container with seven nested bowls.",
      price: 2950,
      compareAtPrice: 3500,
      currency: "INR",
      categoryIndex: 4,
      collectionIndex: 4,
      makerIndex: 4,
      tags: "woodcraft,spice box,kitchenware,masala dabba,kikar,handcrafted",
      isFeatured: false,
      inventory: 16,
      material: "Seasoned Kikar wood (Acacia nilotica), natural beeswax seal",
      dimensions: "9 inches diameter x 3.5 inches depth",
      weight: "950 g",
      careInstructions: "Wipe with a slightly oiled cloth once a month to nourish the wood grain.",
      shippingInfo: "Ships worldwide in custom velvet storage bag.",
      productionLocation: "Bawal, Rewari, Haryana",
      storySnippet: "Meena salvage-buys naturally aged Kikar wood from agricultural field boundaries, ensuring no living trees are felled.",
      impactNotes: "Diverts agricultural pruning from being burned while providing fair artisan wages.",
      images: [
        { url: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=900&q=80", alt: "Artisanal wooden containers on minimalist table", isPrimary: true },
        { url: "https://images.unsplash.com/photo-1584269600519-112d071b35e6?auto=format&fit=crop&w=900&q=80", alt: "Handcrafted wooden bowls with grain details", isPrimary: false },
      ],
      variants: [
        { name: "Natural Honey Grain", price: 2950, inventory: 12 },
        { name: "Dark Walnut Tint", price: 3100, inventory: 4 },
      ]
    },
    {
      sku: "PG-BRS-006",
      name: "Historic Rewari Cold-Hammered Brass Urli",
      slug: "historic-rewari-cold-hammered-brass-urli",
      description: "Shaped from heavy-gauge virgin brass by Bimla Devi's metal collective in Rewari. Decorated with thousands of hand-hammered dimples that catch water and candlelight. Perfect for floating marigolds or as a sacred entryway vessel.",
      shortDescription: "Heavy gauge hand-beaten brass urli for floating blossoms and festive lighting.",
      price: 3850,
      compareAtPrice: 4600,
      currency: "INR",
      categoryIndex: 5,
      collectionIndex: 5,
      makerIndex: 6,
      tags: "brassware,urli,festive,rewari,metalcraft,homedecor",
      isFeatured: true,
      inventory: 18,
      material: "100% Solid Brass with protective lacquer on exterior",
      dimensions: "12 inches diameter x 4.5 inches height",
      weight: "2.1 kg",
      careInstructions: "Clean with tamarind paste or brass polish for mirror shine; or let patina naturally.",
      shippingInfo: "Double-boxed for secure shipment.",
      productionLocation: "Brass Guild Quarter, Rewari, Haryana",
      storySnippet: "Bimla is among the few women in Haryana skilled in cold hammering brass plates over anvil stakes, a technique preserved since the Mughal era.",
      impactNotes: "Preserves rare metal-spinning craft in the traditional brass quarter of Rewari.",
      images: [
        { url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80", alt: "Hammered brass bowl with warm golden glow", isPrimary: true },
        { url: "https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=900&q=80", alt: "Brass vessel with marigold petals", isPrimary: false },
      ],
      variants: [
        { name: "10 Inch Diameter", size: "10 inch", price: 3450, inventory: 8 },
        { name: "12 Inch Diameter", size: "12 inch", price: 3850, inventory: 10 },
      ]
    },
    {
      sku: "PG-APP-007",
      name: "Bhiwani Indigo Khadi Kurta Wrap",
      slug: "bhiwani-indigo-khadi-kurta-wrap",
      description: "Tailored from Amber Charkha handspun organic cotton grown by regional farmers. Vat-dyed in natural cold-fermented indigo and tailored with clean French seams, mother-of-pearl buttons, and side slit pockets.",
      shortDescription: "Solar-spun organic khadi cotton kurta dyed with natural plant indigo.",
      price: 3200,
      compareAtPrice: 3800,
      currency: "INR",
      categoryIndex: 6,
      collectionIndex: 4,
      makerIndex: 5,
      tags: "khadi,apparel,kurta,indigo,organic cotton,sustainable fashion",
      isFeatured: false,
      inventory: 20,
      material: "100% Handloom Cotton Khadi, Natural Indigo extract",
      dimensions: "Available in Small, Medium, Large, X-Large",
      weight: "280 g",
      careInstructions: "First wash separately in cold water with mild detergent. Hang to dry in shade.",
      shippingInfo: "Ships in recycled cotton garment bag.",
      productionLocation: "Siwani Gate, Bhiwani, Haryana",
      storySnippet: "Anita Verma ferments her indigo vats with local jaggery and water. The fabric softens with every wash, lasting years of daily wear.",
      impactNotes: "Supports zero-carbon textile manufacturing and fair agricultural cotton sourcing.",
      images: [
        { url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80", alt: "Indigo textured natural cotton fabric drape", isPrimary: true },
        { url: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=80", alt: "Artisan shirt details with wooden buttons", isPrimary: false },
      ],
      variants: [
        { name: "Small", size: "S", price: 3200, inventory: 5 },
        { name: "Medium", size: "M", price: 3200, inventory: 8 },
        { name: "Large", size: "L", price: 3200, inventory: 5 },
        { name: "X-Large", size: "XL", price: 3200, inventory: 2 },
      ]
    },
    {
      sku: "PG-WL-008",
      name: "Karnal Hand-Spun Native Wool Throw",
      slug: "karnal-hand-spun-native-wool-throw",
      description: "Spun from seasonal sheared fleece of local indigenous sheep, this un-dyed wool blanket retains natural lanolin properties for deep breathable warmth. Finished with hand-twisted tassels by Rajwati Gurjar.",
      shortDescription: "Dense, un-dyed local wool throw blanket with hand-twisted fringe.",
      price: 5400,
      compareAtPrice: 6500,
      currency: "INR",
      categoryIndex: 0,
      collectionIndex: 5,
      makerIndex: 7,
      tags: "wool,throw,blanket,karnal,cozy,winter,handloom",
      isFeatured: true,
      inventory: 11,
      material: "100% Native Haryana Sheep Wool",
      dimensions: "50 inches x 70 inches (127 cm x 178 cm)",
      weight: "1.8 kg",
      careInstructions: "Dry clean or gentle hand wash in cold wool detergent. Lay flat to dry.",
      shippingInfo: "Includes cedarwood ball for natural moth protection in transit.",
      productionLocation: "Gharaunda, Karnal, Haryana",
      storySnippet: "Rajwati sorts the fleece by hand into natural oatmeal, slate, and charcoal shades without relying on chemical bleaching or synthetic dyes.",
      impactNotes: "Provides direct fair-trade pricing to nomadic pastoralist herders.",
      images: [
        { url: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=80", alt: "Warm textured wool throw draped on leather chair", isPrimary: true },
        { url: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=900&q=80", alt: "Fringe detail of handcrafted wool blanket", isPrimary: false },
      ],
      variants: [
        { name: "Oatmeal Natural", color: "Oatmeal", price: 5400, inventory: 7 },
        { name: "Slate Heather", color: "Slate Grey", price: 5400, inventory: 4 },
      ]
    },
    {
      sku: "PG-GFT-009",
      name: "The Haryana Heritage Welcome Gift Chest",
      slug: "the-haryana-heritage-welcome-gift-chest",
      description: "A tribute to Haryana's rich cultural renaissance. Contains a hand-thrown terracotta Chai Kulhad set of two, a hand-braided Moonj coaster set, organic lemongrass herbal infusion, and a mini Phulkari table runner, packed in a keepsake Kikar wood box.",
      shortDescription: "Curated celebration box featuring craftworks from four women artisan guilds.",
      price: 4950,
      compareAtPrice: 5800,
      currency: "INR",
      categoryIndex: 7,
      collectionIndex: 4,
      makerIndex: 0,
      tags: "gift box,hamper,festive,curated,corporate gift,luxury gift",
      isFeatured: true,
      inventory: 25,
      material: "Mixed artisan materials: Terracotta, Moonj grass, Khadi silk, Kikar wood",
      dimensions: "12 x 10 x 5 inches presentation chest",
      weight: "2.4 kg",
      careInstructions: "Refer to individual care guides included inside.",
      shippingInfo: "Pre-assembled with satin ribbon and personalized calligraphy note.",
      productionLocation: "Assembled in Panipat, Haryana",
      storySnippet: "Brings together four distinct women-led cooperatives into a single unified gift experience.",
      impactNotes: "Directly distributes revenue across four independent rural women makers.",
      images: [
        { url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80", alt: "Artisan gift box arrangement with artisanal components", isPrimary: true },
        { url: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=80", alt: "Eco-friendly gift packaging with wax stamp", isPrimary: false },
      ],
      variants: [
        { name: "Signature Edition", price: 4950, inventory: 25 }
      ]
    },
    {
      sku: "PG-TX-010",
      name: "Kala Cotton Panipat Floor Cushion",
      slug: "kala-cotton-panipat-floor-cushion",
      description: "Tufted floor seating pillow made from dense handloom rain-fed cotton. Filled with natural cotton batting for firm meditation, reading nooks, or low-table hosting.",
      shortDescription: "Tufted square floor cushion handwoven with rain-fed organic cotton.",
      price: 2100,
      compareAtPrice: 2600,
      currency: "INR",
      categoryIndex: 0,
      collectionIndex: 0,
      makerIndex: 0,
      tags: "cushion,handloom,panipat,seating,living room,meditation",
      isFeatured: false,
      inventory: 19,
      material: "100% Organic Cotton Khadi exterior, raw cotton fiber fill",
      dimensions: "20 in x 20 in x 5 in (50 cm x 50 cm x 12 cm)",
      weight: "1.9 kg",
      careInstructions: "Removable cover: wash in cold gentle cycle. Spot clean inner cushion.",
      shippingInfo: "Compressed in biodegradable vacuum pack; expands in 30 minutes.",
      productionLocation: "Panipat, Haryana",
      storySnippet: "Hand-tufted with reinforced double-cross stitches by Sunita's senior apprentice group.",
      impactNotes: "Promotes regenerative indigenous rain-fed cotton cultivation.",
      images: [
        { url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80", alt: "Neutral textured floor cushion in sunny room", isPrimary: true },
        { url: "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=900&q=80", alt: "Cushion fabric weave macro", isPrimary: false },
      ],
      variants: [
        { name: "Terracotta Earth", color: "Terracotta", price: 2100, inventory: 10 },
        { name: "Raw Ecru", color: "Natural Ecru", price: 2100, inventory: 9 },
      ]
    },
    {
      sku: "PG-GRS-011",
      name: "Sarkanda Hand-Woven Dining Placemat Set (Set of 4)",
      slug: "sarkanda-dining-placemat-set-of-4",
      description: "Braided with golden river reed stalks and bound with unbleached organic linen cords. Heat-resistant, water-wipable, and adds an earthy tactile warmth to dinner tables.",
      shortDescription: "Set of 4 natural water-resistant table placemats woven from river reeds.",
      price: 1450,
      compareAtPrice: 1800,
      currency: "INR",
      categoryIndex: 2,
      collectionIndex: 2,
      makerIndex: 2,
      tags: "placemats,dining,sarkanda,moonj,tableware,natural fiber",
      isFeatured: false,
      inventory: 35,
      material: "Wild Sarkanda grass, natural cotton thread",
      dimensions: "14 inches diameter round (35 cm)",
      weight: "650 g (set of 4)",
      careInstructions: "Wipe with damp sponge and air dry. Do not immerse completely in water.",
      shippingInfo: "Ships flat between rigid recycled boards.",
      productionLocation: "Jhajjar, Haryana",
      storySnippet: "Harvested sustainably from local seasonal water bodies, dried under sun for 7 days.",
      impactNotes: "Direct income for seasonal women laborers.",
      images: [
        { url: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=900&q=80", alt: "Braided natural fiber round table placemats", isPrimary: true },
        { url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80", alt: "Table setting with natural woven chargers", isPrimary: false },
      ],
      variants: [
        { name: "Set of 4", price: 1450, inventory: 25 },
        { name: "Set of 6", price: 1990, inventory: 10 },
      ]
    },
    {
      sku: "PG-POT-012",
      name: "Terracotta Chai Kulhad Set with Saucers (Set of 6)",
      slug: "terracotta-chai-kulhad-set-of-6",
      description: "Crafted from fine alluvium clay of Jind district, these re-usable glazed interior kulhads infuse tea with the comforting petrichor fragrance of Indian monsoon rain.",
      shortDescription: "Set of 6 reusable glazed clay tea cups with matching saucers.",
      price: 1350,
      compareAtPrice: 1650,
      currency: "INR",
      categoryIndex: 3,
      collectionIndex: 1,
      makerIndex: 3,
      tags: "kulhad,chai cups,terracotta,clay,pottery,tea set",
      isFeatured: true,
      inventory: 40,
      material: "Jind alluvial clay, food-safe lead-free mineral glaze inside",
      dimensions: "Cups: 180 ml capacity, Saucers: 4.5 in diameter",
      weight: "1.3 kg",
      careInstructions: "Dishwasher safe on gentle cycle. Microwave friendly.",
      shippingInfo: "Padded in recyclable honeycomb paper wrap.",
      productionLocation: "Jind, Haryana",
      storySnippet: "Rekha created a custom food-safe clear glaze for the inner cup so you can enjoy everyday tea without staining the clay.",
      impactNotes: "Provides continuous daily production work for the women's studio.",
      images: [
        { url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80", alt: "Artisan ceramic cups with steamy tea", isPrimary: true },
        { url: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80", alt: "Stack of clay tea cups on rustic background", isPrimary: false },
      ],
      variants: [
        { name: "Set of 6", price: 1350, inventory: 40 }
      ]
    },
    {
      sku: "PG-EMB-013",
      name: "Neelam Geometric Phulkari Cushion Covers (Pair)",
      slug: "neelam-geometric-phulkari-cushion-covers-pair",
      description: "Set of two decorative square cushion covers hand-embroidered by Santosh Kumari's collective in Rohtak. The geometric chevron pattern honors the agricultural fields of Haryana.",
      shortDescription: "Pair of hand-embroidered silk floss Phulkari cushion covers.",
      price: 2600,
      compareAtPrice: 3200,
      currency: "INR",
      categoryIndex: 1,
      collectionIndex: 3,
      makerIndex: 1,
      tags: "phulkari,cushion covers,silk thread,living room,rohtak",
      isFeatured: false,
      inventory: 24,
      material: "100% Khadi Cotton with silk embroidery, concealed YKK zipper",
      dimensions: "16 inches x 16 inches (40 cm x 40 cm)",
      weight: "320 g (pair)",
      careInstructions: "Gentle hand wash inside out in mild detergent. Iron on reverse side.",
      shippingInfo: "Ships within 24 hours.",
      productionLocation: "Rohtak, Haryana",
      storySnippet: "Each cushion cover requires 12 hours of meticulous needle alignment by skilled artisans.",
      impactNotes: "Supports health insurance fund for women craftswomen.",
      images: [
        { url: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=80", alt: "Decorative embroidered cushion on linen sofa", isPrimary: true },
        { url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80", alt: "Close up of vibrant darning stitch embroidery", isPrimary: false },
      ],
      variants: [
        { name: "Amber & Indigo (Pair)", price: 2600, inventory: 14 },
        { name: "Terracotta & Olive (Pair)", price: 2600, inventory: 10 },
      ]
    },
    {
      sku: "PG-BRS-014",
      name: "Rewari Brass Hand-Etched Aarti Diya",
      slug: "rewari-brass-hand-etched-aarti-diya",
      description: "Solid bell brass ritual lamp hand-cast and etched with floral motifs. Features a sturdy heat-insulated handle and deep oil reservoir suitable for long burning sessions.",
      shortDescription: "Cast brass oil lamp with traditional hand-carved leaf and floral etching.",
      price: 1850,
      compareAtPrice: 2200,
      currency: "INR",
      categoryIndex: 5,
      collectionIndex: 5,
      makerIndex: 6,
      tags: "brass,diya,oil lamp,rewari,festive,pooja,heritage",
      isFeatured: false,
      inventory: 28,
      material: "Virgin Cast Brass",
      dimensions: "8 in length x 4 in width x 3 in height",
      weight: "680 g",
      careInstructions: "Wash with pitambari powder or lemon slice to preserve bright brass finish.",
      shippingInfo: "Secure padded box packaging.",
      productionLocation: "Rewari, Haryana",
      storySnippet: "Bimla Devi's foundry uses lost-wax technique molds preserved across four family generations.",
      impactNotes: "Guarantees fair compensation in metal casting trades.",
      images: [
        { url: "https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=900&q=80", alt: "Handcrafted brass lamp shining in soft light", isPrimary: true },
        { url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80", alt: "Brass etching details on temple lamp", isPrimary: false },
      ],
      variants: [
        { name: "Single Diya", price: 1850, inventory: 20 },
        { name: "Pair of Diyas", price: 3400, inventory: 8 },
      ]
    },
    {
      sku: "PG-WD-015",
      name: "Carved Sheesham Wood Roti Box (Chapatidan)",
      slug: "carved-sheesham-wood-roti-box",
      description: "A cherished staple of traditional North Indian hospitality. Keeps rotis and parathas fresh and warm while absorbing condensation. Lidded with a brass finial handle.",
      shortDescription: "Hand-turned Sheesham wood container for bread with brass lid finial.",
      price: 2350,
      compareAtPrice: 2800,
      currency: "INR",
      categoryIndex: 4,
      collectionIndex: 4,
      makerIndex: 4,
      tags: "roti box,woodcraft,sheesham,kitchenware,serveware,bread container",
      isFeatured: false,
      inventory: 15,
      material: "Natural Sheesham wood, pure brass finial knob",
      dimensions: "9 in diameter x 4.5 in height",
      weight: "1.1 kg",
      careInstructions: "Wipe clean with a damp towel. Do not soak in water.",
      shippingInfo: "Ships with custom cotton liner cloth included.",
      productionLocation: "Rewari, Haryana",
      storySnippet: "Crafted on Meena's woodturner lathe from naturally fallen timber.",
      impactNotes: "Revives wooden kitchenware alternatives to plastic casseroles.",
      images: [
        { url: "https://images.unsplash.com/photo-1584269600519-112d071b35e6?auto=format&fit=crop&w=900&q=80", alt: "Carved wooden round container on rustic tabletop", isPrimary: true },
        { url: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=900&q=80", alt: "Sheesham wood grain detail on lid", isPrimary: false },
      ],
      variants: [
        { name: "Standard (9 inch)", price: 2350, inventory: 15 }
      ]
    },
    {
      sku: "PG-APP-016",
      name: "Handspun Khadi Nehru Waistcoat Jacket",
      slug: "handspun-khadi-nehru-waistcoat-jacket",
      description: "Tailored Nehru jacket crafted from dense hand-loomed 3-ply khadi cotton. Features handcrafted horn buttons, welt pockets, and breathable silk lining.",
      shortDescription: "Tailored Nehru collar sleeveless vest jacket in textured khadi cotton.",
      price: 3950,
      compareAtPrice: 4700,
      currency: "INR",
      categoryIndex: 6,
      collectionIndex: 4,
      makerIndex: 5,
      tags: "jacket,nehru vest,khadi,apparel,menswear,unisex,festive",
      isFeatured: false,
      inventory: 17,
      material: "100% Handspun Cotton Khadi exterior, mulberry silk lining",
      dimensions: "Chest sizes: 38, 40, 42, 44",
      weight: "390 g",
      careInstructions: "Dry clean recommended for crisp collar structure.",
      shippingInfo: "Ships in rigid gift suit bag.",
      productionLocation: "Bhiwani, Haryana",
      storySnippet: "Anita Verma ensures each buttonhole is hand-bound with needle and silk cord.",
      impactNotes: "Directly funds community tailoring apprenticeships.",
      images: [
        { url: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=80", alt: "Tailored vest garment with natural buttons", isPrimary: true },
        { url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80", alt: "Textured khadi cotton weave up close", isPrimary: false },
      ],
      variants: [
        { name: "Size 38 (Small)", size: "38", price: 3950, inventory: 4 },
        { name: "Size 40 (Medium)", size: "40", price: 3950, inventory: 6 },
        { name: "Size 42 (Large)", size: "42", price: 3950, inventory: 5 },
        { name: "Size 44 (XL)", size: "44", price: 3950, inventory: 2 },
      ]
    },
    {
      sku: "PG-TX-017",
      name: "Panipat Indigo Diamond Handwoven Runner",
      slug: "panipat-indigo-diamond-handwoven-runner",
      description: "Reversible long table and hallway runner featuring bold geometric diamond motifs. Woven with organic indigo and unbleached cotton threads on Panipat pit looms.",
      shortDescription: "Long reversible geometric diamond runner for hallways or dining tables.",
      price: 2850,
      compareAtPrice: 3400,
      currency: "INR",
      categoryIndex: 0,
      collectionIndex: 0,
      makerIndex: 0,
      tags: "runner,dhurrie,handloom,indigo,table runner,hallway",
      isFeatured: false,
      inventory: 18,
      material: "100% Cotton, Plant Indigo dye",
      dimensions: "16 inches x 72 inches (40 cm x 183 cm)",
      weight: "920 g",
      careInstructions: "Machine wash cold gentle cycle. Air dry flat.",
      shippingInfo: "Dispatches within 48 hours.",
      productionLocation: "Panipat, Haryana",
      storySnippet: "Sunita Devi wove this on her longest loom beam, maintaining tension without mechanical tensioners.",
      impactNotes: "Supports zero-effluent natural dye workshops.",
      images: [
        { url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=900&q=80", alt: "Woven textile runner on long dining table", isPrimary: true },
        { url: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=900&q=80", alt: "Indigo diamond weave close up", isPrimary: false },
      ],
      variants: [
        { name: "Standard (6 ft)", size: "6 ft", price: 2850, inventory: 12 },
        { name: "Long (8 ft)", size: "8 ft", price: 3650, inventory: 6 },
      ]
    },
    {
      sku: "PG-GRS-018",
      name: "Mewat Hand-Plaited Bread & Fruit Basket",
      slug: "mewat-hand-plaited-bread-fruit-basket",
      description: "Shallow woven basket ideal for warm rotis, breads, or fresh fruit display. Breathable grass fibers allow steam to escape without making bread soggy.",
      shortDescription: "Shallow breathable wild grass bowl for dining table bread service.",
      price: 980,
      compareAtPrice: 1250,
      currency: "INR",
      categoryIndex: 2,
      collectionIndex: 2,
      makerIndex: 2,
      tags: "basket,bread basket,fruit bowl,moonj,tableware,kitchen",
      isFeatured: false,
      inventory: 45,
      material: "Wild Moonj grass with organic cotton stitching",
      dimensions: "11 inches diameter x 3 inches depth",
      weight: "310 g",
      careInstructions: "Wipe with damp cloth and dry in sunlight.",
      shippingInfo: "Plastic-free packaging.",
      productionLocation: "Jhajjar / Mewat border, Haryana",
      storySnippet: "Hand-braided in 3 hours by Kamlesh Rani's junior artisan circle.",
      impactNotes: "100% biodegradable product footprint.",
      images: [
        { url: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=900&q=80", alt: "Natural braided shallow bread basket", isPrimary: true },
        { url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80", alt: "Basket filled with fresh artisanal rolls", isPrimary: false },
      ],
      variants: [
        { name: "Natural Honey", price: 980, inventory: 45 }
      ]
    },
    {
      sku: "PG-POT-019",
      name: "Rohtak Terracotta Planter Urn with Saucer",
      slug: "rohtak-terracotta-planter-urn-with-saucer",
      description: "Thick-walled porous terracotta planter that allows plant roots to breathe and prevents soil waterlogging. Wheel-thrown with subtle ribbed rings around the rim.",
      shortDescription: "Porous unglazed clay plant pot with drainage hole and matching plate.",
      price: 1450,
      compareAtPrice: 1750,
      currency: "INR",
      categoryIndex: 3,
      collectionIndex: 1,
      makerIndex: 3,
      tags: "planter,terracotta,clay pot,gardening,botanical,rohtak",
      isFeatured: false,
      inventory: 26,
      material: "High-fired porous Haryana terracotta",
      dimensions: "8 in diameter x 7.5 in height (includes drainage hole)",
      weight: "1.7 kg",
      careInstructions: "Outdoor and indoor safe. Will develop beautiful natural mineral patina over time.",
      shippingInfo: "Drop-tested packaging guaranteed against transit fractures.",
      productionLocation: "Rohtak, Haryana",
      storySnippet: "Rekha Sharma hand-finishes each rim with a ridged thumb print pattern.",
      impactNotes: "Provides livelihood stability outside traditional harvest seasons.",
      images: [
        { url: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80", alt: "Terracotta planter with green foliage", isPrimary: true },
        { url: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80", alt: "Raw clay pottery detail on workbench", isPrimary: false },
      ],
      variants: [
        { name: "Medium (8 inch)", size: "8 inch", price: 1450, inventory: 16 },
        { name: "Large (10 inch)", size: "10 inch", price: 1850, inventory: 10 },
      ]
    },
    {
      sku: "PG-EMB-020",
      name: "Midnight Silk Phulkari Embroidered Tote Bag",
      slug: "midnight-silk-phulkari-embroidered-tote-bag",
      description: "Daily carryall tote made from heavy 14oz black cotton canvas, adorned with an authentic hand-embroidered Phulkari front panel by Santosh Kumari's team. Features reinforced leather handles and magnetic snap closure.",
      shortDescription: "Heavy canvas everyday tote featuring a genuine Phulkari embroidered pocket panel.",
      price: 2750,
      compareAtPrice: 3300,
      currency: "INR",
      categoryIndex: 1,
      collectionIndex: 3,
      makerIndex: 1,
      tags: "tote bag,phulkari,handbag,canvas,silk embroidery,accessories",
      isFeatured: true,
      inventory: 20,
      material: "14oz Cotton Canvas, Vegetable-tanned leather straps, Mulberry silk thread",
      dimensions: "15 in high x 14 in wide x 4 in gusset",
      weight: "480 g",
      careInstructions: "Spot clean canvas with wet sponge. Do not machine wash.",
      shippingInfo: "Ships worldwide in branded dust bag.",
      productionLocation: "Rohtak, Haryana",
      storySnippet: "Combines modern everyday utility with centuries-old needle art.",
      impactNotes: "Enables young women to earn an independent income while continuing higher education.",
      images: [
        { url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80", alt: "Canvas and embroidered tote bag on bench", isPrimary: true },
        { url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80", alt: "Close up of colorful geometric silk stitches on pocket", isPrimary: false },
      ],
      variants: [
        { name: "Midnight Black & Amber", price: 2750, inventory: 12 },
        { name: "Raw Ecru & Crimson", price: 2750, inventory: 8 },
      ]
    }
  ];

  for (const p of productsData) {
    const category = categories[p.categoryIndex];
    const collection = collections[p.collectionIndex];
    const maker = makers[p.makerIndex];

    const createdProduct = await prisma.product.create({
      data: {
        sku: p.sku,
        name: p.name,
        slug: p.slug,
        description: p.description,
        shortDescription: p.shortDescription,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        currency: p.currency,
        categoryId: category.id,
        collectionId: collection.id,
        makerId: maker.id,
        tags: p.tags,
        isFeatured: p.isFeatured,
        isPublished: true,
        inventory: p.inventory,
        material: p.material,
        dimensions: p.dimensions,
        weight: p.weight,
        careInstructions: p.careInstructions,
        shippingInfo: p.shippingInfo,
        productionLocation: p.productionLocation,
        storySnippet: p.storySnippet,
        impactNotes: p.impactNotes,
        seoTitle: `${p.name} | Handcrafted in Haryana | PeepalKrat`,
        seoDescription: p.shortDescription,
        images: {
          create: p.images.map((img, idx) => ({
            url: img.url,
            altText: img.alt,
            isPrimary: img.isPrimary,
            order: idx,
          })),
        },
        variants: {
          create: p.variants.map((v, idx) => ({
            name: v.name,
            sku: `${p.sku}-V${idx + 1}`,
            size: (v as any).size || null,
            color: (v as any).color || null,
            price: v.price || p.price,
            compareAtPrice: (v as any).compareAtPrice || null,
            inventory: v.inventory || 5,
          })),
        },
        reviews: {
          create: [
            {
              customerName: "Aarav Mehra",
              customerEmail: "aarav.mehra@example.com",
              rating: 5,
              title: "Exceptional craftsmanship and deep character",
              comment: `The quality of this piece exceeded my expectations. Knowing that it was crafted by ${maker.name} in ${p.productionLocation} gives it emotional value that no factory store can match.`,
            },
            {
              customerName: "Dr. Priyanshi Taneja",
              customerEmail: "priyanshi.t@example.com",
              rating: 5,
              title: "True heirloom quality",
              comment: "Beautiful texture, fast plastic-free delivery, and inspiring artisan story card inside the box.",
            }
          ]
        }
      },
    });

    console.log(`📦 Seeded product: ${createdProduct.name} (${createdProduct.sku})`);
  }

  // 7. Seed Sample Customers and Orders
  const sampleCustomer = await prisma.customer.create({
    data: {
      firstName: "Vikram",
      lastName: "Singhania",
      email: "vikram.s@example.com",
      phone: "+91 98112 34567",
      totalSpent: 11050,
      ordersCount: 2,
      addresses: {
        create: {
          fullName: "Vikram Singhania",
          phone: "+91 98112 34567",
          line1: "Flat 802, Magnolia Towers, Golf Course Road",
          line2: "Sector 54",
          city: "Gurugram",
          state: "Haryana",
          postalCode: "122002",
          country: "India",
          isDefault: true,
        }
      }
    }
  });

  const firstProduct = await prisma.product.findFirst({ where: { sku: "PG-TX-001" } });
  const secondProduct = await prisma.product.findFirst({ where: { sku: "PG-POT-004" } });

  if (firstProduct && secondProduct) {
    await prisma.order.create({
      data: {
        orderNumber: "PG-2026-8901",
        customerId: sampleCustomer.id,
        customerEmail: sampleCustomer.email,
        customerPhone: sampleCustomer.phone,
        shippingName: "Vikram Singhania",
        shippingAddressLine1: "Flat 802, Magnolia Towers, Golf Course Road",
        shippingAddressLine2: "Sector 54",
        shippingCity: "Gurugram",
        shippingState: "Haryana",
        shippingPostalCode: "122002",
        shippingCountry: "India",
        subtotal: 6500,
        discount: 0,
        tax: 0,
        shippingFee: 0,
        total: 6500,
        currency: "INR",
        paymentMethod: "RAZORPAY",
        paymentStatus: "PAID",
        paymentReference: "pay_sample_rzp_987123",
        fulfillmentStatus: "DELIVERED",
        trackingNumber: "DEL-AIR-8921827",
        trackingCarrier: "BlueDart Express",
        notes: "Delivered to reception safely.",
        items: {
          create: [
            {
              productId: firstProduct.id,
              name: firstProduct.name,
              sku: firstProduct.sku,
              price: firstProduct.price,
              quantity: 1,
              total: firstProduct.price,
              imageUrl: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80",
            },
            {
              productId: secondProduct.id,
              name: secondProduct.name,
              sku: secondProduct.sku,
              price: secondProduct.price,
              quantity: 1,
              total: secondProduct.price,
              imageUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80",
            }
          ]
        }
      }
    });

    await prisma.order.create({
      data: {
        orderNumber: "PG-2026-8902",
        customerId: sampleCustomer.id,
        customerEmail: "ananya.sharma@example.com",
        customerPhone: "+91 99580 12345",
        shippingName: "Ananya Sharma",
        shippingAddressLine1: "B-42, Defence Colony",
        shippingCity: "New Delhi",
        shippingState: "Delhi",
        shippingPostalCode: "110024",
        shippingCountry: "India",
        subtotal: 4550,
        discount: 455,
        couponCode: "WELCOME10",
        tax: 0,
        shippingFee: 0,
        total: 4095,
        currency: "INR",
        paymentMethod: "UPI",
        paymentStatus: "PAID",
        paymentReference: "upi_sample_ref_55123",
        fulfillmentStatus: "SHIPPED",
        trackingNumber: "IND-POST-991244",
        trackingCarrier: "India Post Speed Post",
        items: {
          create: [
            {
              productId: firstProduct.id,
              name: firstProduct.name,
              sku: firstProduct.sku,
              price: 4550,
              quantity: 1,
              total: 4550,
            }
          ]
        }
      }
    });
  }

  console.log("🧾 Seeded sample customer and orders.");

  // 8. Seed Discount Coupons
  await prisma.coupon.createMany({
    data: [
      {
        code: "WELCOME10",
        description: "10% off on your first order with PeepalKrat",
        discountType: "PERCENTAGE",
        discountValue: 10,
        minOrderValue: 1500,
        isActive: true,
      },
      {
        code: "HARYANAHERITAGE",
        description: "15% off on handloom and pottery over ₹3,500",
        discountType: "PERCENTAGE",
        discountValue: 15,
        minOrderValue: 3500,
        isActive: true,
      },
      {
        code: "FREESHIP",
        description: "Complimentary express shipping across India",
        discountType: "FIXED",
        discountValue: 200,
        minOrderValue: 999,
        isActive: true,
      }
    ]
  });

  console.log("🎟️ Seeded promotional coupons.");

  // 9. Seed Content Blocks (For Non-technical Staff CMS Control)
  await prisma.contentBlock.createMany({
    data: [
      {
        key: "hero_headline",
        type: "TEXT",
        title: "FOR THE PEOPLE. BY THE PEOPLE.",
        subtitle: "Every purchase carries a story.",
        content: "Discover genuine heirloom textiles, botanical grasscraft, and studio pottery shaped by the skilled hands of women across Haryana.",
        linkUrl: "/shop",
        isActive: true,
      },
      {
        key: "brand_manifesto",
        type: "TEXT",
        title: "Agency Over Charity. Craftsmanship Over Poverty.",
        subtitle: "When you buy from PeepalKrat, you participate in someone's opportunity.",
        content: "PeepalKrat is not a charity donation website. We are a premier cultural commerce enterprise. The women of Haryana are not victims; they are master makers, entrepreneurs, artists, and community pillars.",
        linkUrl: "/our-story",
        isActive: true,
      },
      {
        key: "announcement_bar",
        type: "BANNER",
        title: "Plastic-Free Packaging Across All Orders • Complimentary Pan-India Shipping Above ₹2,000",
        linkUrl: "/shop",
        isActive: true,
      },
      {
        key: "impact_metrics",
        type: "STATISTIC",
        title: "Verified Community Impact",
        content: JSON.stringify([
          { label: "Women Makers & Artisans", value: "85+", note: "Across 6 Haryana districts" },
          { label: "Direct Artisan Wage Share", value: "72%", note: "Of retail product price" },
          { label: "Heritage Crafts Preserved", value: "8", note: "From pit-loom to cold brass" },
          { label: "Plastic-Free Packaging", value: "100%", note: "Recycled cotton & paper" },
        ]),
        isActive: true,
      }
    ]
  });

  // 10. Seed Store Settings
  await prisma.siteSetting.createMany({
    data: [
      { key: "store_name", value: "PeepalKrat", group: "GENERAL" },
      { key: "store_tagline", value: "For the People. By the People.", group: "GENERAL" },
      { key: "contact_email", value: "hello@peepalkrat.com", group: "GENERAL" },
      { key: "contact_phone", value: "+91 180 264 0000", group: "GENERAL" },
      { key: "headquarters", value: "Sector 25, Panipat, Haryana 132103, India", group: "GENERAL" },
      { key: "free_shipping_threshold_inr", value: "2000", group: "SHIPPING" },
      { key: "standard_shipping_fee_inr", value: "150", group: "SHIPPING" },
      { key: "express_shipping_fee_inr", value: "250", group: "SHIPPING" },
      { key: "usd_exchange_rate", value: "0.012", group: "CURRENCY" },
      { key: "eur_exchange_rate", value: "0.011", group: "CURRENCY" },
      { key: "gbp_exchange_rate", value: "0.0094", group: "CURRENCY" },
    ]
  });

  console.log("⚙️ Seeded CMS Content Blocks and Store Settings.");
  console.log("✨ PeepalKrat database seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
