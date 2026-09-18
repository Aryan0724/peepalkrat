import { prisma } from "../src/lib/db";

async function seedNoveltyLines() {
  console.log("🌸 Seeding Pinklay-inspired circular novelty lines & categories...");

  // 1. Makers lookup
  const makers = await prisma.maker.findMany();
  const sunita = makers.find((m) => m.name.includes("Sunita")) || makers[0];
  const santosh = makers.find((m) => m.name.includes("Santosh")) || makers[1];
  const bimla = makers.find((m) => m.name.includes("Bimla")) || makers[2];
  const kamlesh = makers.find((m) => m.name.includes("Kamlesh")) || makers[3];
  const rajwati = makers.find((m) => m.name.includes("Rajwati")) || makers[4];
  const rekha = makers.find((m) => m.name.includes("Rekha")) || makers[5];

  // 2. Upsert Featured Circular Categories
  const categoriesData = [
    {
      slug: "festive-ornaments",
      name: "Festive Ornaments",
      badge: "Holiday",
      description: "Hand-painted terracotta baubles, Rewari brass chime bells, and plush Phulkari hanging stars crafted for festive celebration.",
      image: "https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&w=600&q=80",
      isFeatured: true,
      order: 1,
    },
    {
      slug: "buntings-torans",
      name: "Buntings & Torans",
      badge: "Festive",
      description: "Zero-waste celebratory buntings and doorway torans made from upcycled handloom cotton and festive Phulkari tassels.",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
      isFeatured: true,
      order: 2,
    },
    {
      slug: "hair-accessories",
      name: "Hair Accessories",
      badge: "Trending",
      description: "Hand-embroidered Phulkari scrunchies, brass hair pins with peepal leaf filigree, and handwoven khadi headbands.",
      image: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=600&q=80",
      isFeatured: true,
      order: 3,
    },
    {
      slug: "bag-charms",
      name: "Bag Charms & Keys",
      badge: "Gifting",
      description: "Haryana folk bird fabric charms, Rewari cold-cast brass keychains, and miniature Moonj grass woven charms.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80",
      isFeatured: true,
      order: 4,
    },
    {
      slug: "kids-apparel",
      name: "Kids & Toddlers",
      badge: "Pure Cotton",
      description: "Gentle desi cotton Angrakha kurtas, soft baby jhablas, and hand-stitched organic cotton animal cushions.",
      image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80",
      isFeatured: true,
      order: 5,
    },
    {
      slug: "living-decor",
      name: "Living & Decor",
      badge: "Heirloom",
      description: "Hand-hammered brass tealights, Moonj wild grass circular wall plates, and alluvial clay terracotta candle pots.",
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
      isFeatured: true,
      order: 6,
    },
    {
      slug: "phulkari-embroidery",
      name: "Phulkari Stoles",
      badge: "Heritage",
      description: "Counted-thread geometric silk needlework on handspun khadi cotton.",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
      isFeatured: true,
      order: 7,
    },
    {
      slug: "handloom-weaves",
      name: "Panipat Dhurries",
      badge: "Bestseller",
      description: "Heavyweight geometric flat-weaves handloomed from desi unbleached cotton.",
      image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80",
      isFeatured: true,
      order: 8,
    },
  ];

  const categoryMap: Record<string, string> = {};

  for (const cat of categoriesData) {
    const upserted = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        badge: cat.badge,
        description: cat.description,
        image: cat.image,
        isFeatured: cat.isFeatured,
        order: cat.order,
      },
      create: {
        slug: cat.slug,
        name: cat.name,
        badge: cat.badge,
        description: cat.description,
        image: cat.image,
        isFeatured: cat.isFeatured,
        order: cat.order,
      },
    });
    categoryMap[cat.slug] = upserted.id;
    console.log(`✅ Upserted category: ${cat.name}`);
  }

  // 3. New 12 Novelty Products with Authentic Craft Details & Pricing
  const newProducts = [
    // --- FESTIVE ORNAMENTS ---
    {
      name: "Rewari Brass Chime Bell & Terracotta Bauble Set (Pack of 4)",
      slug: "rewari-brass-chime-terracotta-bauble-set",
      sku: "PK-ORN-001",
      shortDescription: "Hand-painted terracotta holiday baubles paired with cold-hammered musical brass chime bells from Rewari.",
      description: "Celebrate the holiday season with an ethical living heirloom. Each bauble is wheel-thrown from riverbed clay by Rekha Sharma's women potter guild in Jind, hand-painted with natural mineral pigments, and paired with miniature musical brass bells beaten by Bimla Devi's foundry collective in Rewari. Comes with hand-spun cotton hanging loops in a zero-waste cotton gift pouch.",
      price: 799,
      compareAtPrice: 1100,
      costPrice: 420,
      inventory: 45,
      isPublished: true,
      isFeatured: true,
      categorySlug: "festive-ornaments",
      makerId: rekha.id,
      material: "Alluvial terracotta river clay, natural mineral pigments, sand-cast brass, unbleached desi cotton thread",
      dimensions: "Each bauble: 6.5 cm diameter; Brass bell: 3.5 cm height",
      careInstructions: "Wipe with a dry soft cloth. Keep away from direct water immersion.",
      productionLocation: "Jind & Rewari, Haryana",
      storySnippet: "Wheel-thrown earthenware and hand-beaten bell-metal casting creating dignified livelihood for 6 women.",
      impactNotes: "72% of retail price goes directly to Rekha and Bimla's artisan groups.",
      primaryImage: "https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&w=1000&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1512474932049-78ac69ede12c?auto=format&fit=crop&w=1000&q=85",
        "https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?auto=format&fit=crop&w=1000&q=85",
      ],
    },
    {
      name: "Rohtak Phulkari Velvet Star Hanging Ornaments (Set of 3)",
      slug: "rohtak-phulkari-velvet-star-ornaments",
      sku: "PK-ORN-002",
      shortDescription: "Heirloom counted-thread silk floss embroidered star ornaments crafted on upcycled velvet scraps.",
      description: "Zero-waste holiday joy rooted in rural Haryana. These plush holiday star ornaments are hand-embroidered by Santosh Kumari and her apprentice circle in Rohtak using vibrant untwisted Resham silk floss on upcycled festive fabrics. Filled with clean raw cotton batting and finished with brass bead drops.",
      price: 650,
      compareAtPrice: 890,
      costPrice: 340,
      inventory: 60,
      isPublished: true,
      isFeatured: true,
      categorySlug: "festive-ornaments",
      makerId: santosh.id,
      material: "Upcycled cotton-velvet, pure mulberry Resham silk floss, raw cotton fill, Rewari brass beads",
      dimensions: "11 cm x 11 cm each; 8 cm hanging loop",
      careInstructions: "Spot clean only with a damp cotton cloth. Store flat in provided cotton pouch.",
      productionLocation: "Rohtak, Haryana",
      storySnippet: "Hand-counted darning stitch Phulkari embroidery upcycling remnant festive fabric scraps.",
      impactNotes: "Directly funds schooling for Santosh's apprentice daughters.",
      primaryImage: "https://images.unsplash.com/photo-1512474932049-78ac69ede12c?auto=format&fit=crop&w=1000&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&w=1000&q=85",
      ],
    },

    // --- BUNTINGS & TORANS ---
    {
      name: "Upcycled Handloom Cotton Festive Triangle Bunting (3 Metres)",
      slug: "upcycled-handloom-cotton-triangle-bunting",
      sku: "PK-BNT-001",
      shortDescription: "A 3-metre garland of 14 double-sided handwoven bunting flags crafted from Panipat loom remnants.",
      description: "Breathe celebratory warmth into your living room, nursery, or festive garden. Created by Sunita Devi's weaving shed in Panipat, this bunting is stitched from surplus handloom dhurrie warp cuttings and unbleached khadi cotton. Washable, durable, and designed to replace single-use plastic festival decor.",
      price: 599,
      compareAtPrice: 850,
      costPrice: 310,
      inventory: 40,
      isPublished: true,
      isFeatured: true,
      categorySlug: "buntings-torans",
      makerId: sunita.id,
      material: "100% upcycled handloom cotton scraps, natural botanical dyes, twisted cotton cord",
      dimensions: "3 metres total length; 14 flags (each 15 cm x 18 cm)",
      careInstructions: "Gentle hand wash in cold water with mild detergent. Line dry in shade.",
      productionLocation: "Panipat, Haryana",
      storySnippet: "Panipat pit-loom scrap patchwork & precision edge-stitching preventing textile waste.",
      impactNotes: "100% circular and zero-waste, crafted during loom rethreading intervals.",
      primaryImage: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1000&q=85",
      ],
    },
    {
      name: "Marigold-Inspired Phulkari Pom-Pom Doorway Toran",
      slug: "marigold-phulkari-pom-pom-doorway-toran",
      sku: "PK-BNT-002",
      shortDescription: "Traditional auspicious doorway hanging with saffron silk pom-poms, brass ghungroos, and Phulkari motifs.",
      description: "Welcome guests with timeless Haryana auspicious hospitality. This festive doorway Toran features handcrafted saffron and mustard woollen pom-poms made by women artisans in Rohtak, interspersed with hand-embroidered geometric Phulkari rosettes and chime bells from Rewari.",
      price: 850,
      compareAtPrice: 1200,
      costPrice: 450,
      inventory: 30,
      isPublished: true,
      isFeatured: true,
      categorySlug: "buntings-torans",
      makerId: santosh.id,
      material: "Natural sheep wool yarn, Resham silk embroidery on cotton, Rewari brass chime bells",
      dimensions: "105 cm length; 25 cm central drop",
      careInstructions: "Dry brush gently. Do not machine wash.",
      productionLocation: "Rohtak, Haryana",
      storySnippet: "Traditional Haryana pom-pom crafting & Phulkari needlework passed down across three generations.",
      impactNotes: "Provides elderly women artisans with dignified home-based seasonal work.",
      primaryImage: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1000&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=85",
      ],
    },

    // --- HAIR ACCESSORIES ---
    {
      name: "Rohtak Phulkari Silk Floss Embroidered Scrunchies (Duo Set)",
      slug: "rohtak-phulkari-silk-embroidered-scrunchies-duo",
      sku: "PK-HAR-001",
      shortDescription: "Pair of premium khadi scrunchies adorned with hand-stitched Phulkari motifs and snag-free elastic.",
      description: "A wearable token of Haryana's textile mastery. These scrunchies are handcrafted by young women apprentices under Santosh Kumari in Rohtak. Made from pure unbleached khadi cotton, hand-embroidered with dainty geometric floral motifs, and fitted with high-recovery snag-free elastic that preserves hair integrity.",
      price: 399,
      compareAtPrice: 550,
      costPrice: 190,
      inventory: 75,
      isPublished: true,
      isFeatured: true,
      categorySlug: "hair-accessories",
      makerId: santosh.id,
      material: "Handspun Khadi cotton, Resham silk thread, organic cotton-encased elastic",
      dimensions: "11 cm outer diameter; expands comfortably to 22 cm",
      careInstructions: "Hand wash in cool water with mild shampoo. Air dry flat.",
      productionLocation: "Rohtak, Haryana",
      storySnippet: "Created by apprentice girls in Rohtak learning ancestral counted-thread embroidery.",
      impactNotes: "100% of proceeds go directly to apprentice educational stipends.",
      primaryImage: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=1000&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85",
      ],
    },
    {
      name: "Cold-Beaten Brass Hair Pin with Peepal Leaf Filigree",
      slug: "cold-beaten-brass-peepal-leaf-hair-pin",
      sku: "PK-HAR-002",
      shortDescription: "Solid brass artisanal hair fork with hand-cut Peepal tree leaf silhouette and hammered antique patina.",
      description: "Handcrafted in the historic metal district of Rewari by Bimla Devi. Each hair pin is cut from solid cartridge brass, filed by hand with smooth rounded tips to glide easily into buns or twists, and delicately etched with Peepal leaf vein filigree.",
      price: 480,
      compareAtPrice: 699,
      costPrice: 230,
      inventory: 50,
      isPublished: true,
      isFeatured: true,
      categorySlug: "hair-accessories",
      makerId: bimla.id,
      material: "Pure unlacquered solid brass (Rewari alloy)",
      dimensions: "14 cm length; 3.5 cm width at leaf crown",
      careInstructions: "Restore natural golden gleam with lemon juice and pitambari or let develop an earthy vintage patina.",
      productionLocation: "Rewari, Haryana",
      storySnippet: "Cold-chisel metal filigree and hand-hammering by Rewari's women metal smiths.",
      impactNotes: "Sustains Haryana's dying heritage of artisanal non-ferrous foundry work.",
      primaryImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=1000&q=85",
      ],
    },

    // --- BAG CHARMS & KEYCHAINS ---
    {
      name: "Haryana Folk Sparrow Embroidered Bag Charm & Tassel",
      slug: "haryana-folk-sparrow-bag-charm-tassel",
      sku: "PK-CHM-001",
      shortDescription: "Playful hand-stitched folk sparrow charm with woollen pom-poms, brass beads, and sturdy swivel clasp.",
      description: "Inspired by the sparrows nesting in the clay verandas of Haryana villages. Hand-cut and hand-embroidered by women in Karnal using scrap handloom fabric, fitted with brass bells from Rewari, and attached to a heavy-duty antique brass swivel hook that easily clips onto handbags, totes, or backpacks.",
      price: 349,
      compareAtPrice: 499,
      costPrice: 170,
      inventory: 80,
      isPublished: true,
      isFeatured: true,
      categorySlug: "bag-charms",
      makerId: rajwati.id,
      material: "Handloom cotton scraps, Resham silk thread, brass bell, antique brass lobster clasp",
      dimensions: "Bird: 8 cm x 6 cm; Total hanging length: 18 cm",
      careInstructions: "Spot clean only with a soft brush.",
      productionLocation: "Karnal, Haryana",
      storySnippet: "Folk doll sculpting & appliqué needlework celebrating rural birds.",
      impactNotes: "Funds local micro-savings group managed by 12 village women.",
      primaryImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85",
      ],
    },
    {
      name: "Jhajjar Miniature Moonj Grass Basket Keychain with Brass Chime",
      slug: "jhajjar-miniature-moonj-grass-basket-keychain",
      sku: "PK-CHM-002",
      shortDescription: "Delightful miniature hand-coiled wild Moonj grass basket with a genuine jingling brass chime bell.",
      description: "Showcasing the astonishing micro-weaving skills of Kamlesh Rani in Jhajjar. Wild canal reeds are split into hair-fine strands, naturally sun-dried, and coiled into a sturdy 4 cm miniature storage basket keychain. Perfect for storing tiny lucky coins, earbuds, or house keys.",
      price: 299,
      compareAtPrice: 450,
      costPrice: 150,
      inventory: 65,
      isPublished: true,
      isFeatured: true,
      categorySlug: "bag-charms",
      makerId: kamlesh.id,
      material: "Wild harvested Moonj canal reed (Saccharum munja), brass split ring, Rewari bell",
      dimensions: "Basket: 4.5 cm diameter, 4 cm height; Ring: 3 cm diameter",
      careInstructions: "Keep dry. If exposed to moisture, dry thoroughly in indirect sunlight.",
      productionLocation: "Jhajjar, Haryana",
      storySnippet: "Micro-coil basketry weaving using regenerative canal reeds.",
      impactNotes: "Directly rewards 4 days of intricate hand-harvesting and splitting work.",
      primaryImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85",
      ],
    },

    // --- KIDS & TODDLER APPAREL ---
    {
      name: "Desi Cotton Organic Angrakha Kurta & Dhoti Set for Toddlers",
      slug: "desi-cotton-organic-angrakha-kurta-dhoti-kids",
      sku: "PK-KID-001",
      shortDescription: "Ultra-breathable unbleached desi cotton Angrakha set with fabric tie-ups and soft elasticated dhoti.",
      description: "Pure, non-toxic heirloom comfort for delicate skin. Tailored by Rajwati Gurjar's women's tailoring group in Karnal from chemical-free, rain-fed desi cotton. Features traditional side-tying Angrakha overlapping placket, zero metal fasteners, and flat fell seams that prevent chafing.",
      price: 1199,
      compareAtPrice: 1699,
      costPrice: 620,
      inventory: 35,
      isPublished: true,
      isFeatured: true,
      categorySlug: "kids-apparel",
      makerId: rajwati.id,
      material: "100% GOTS certified organic desi cotton, cotton fabric string ties, soft knit waistband",
      dimensions: "Available in: 6-12 Months, 1-2 Years, 2-3 Years, 3-4 Years",
      careInstructions: "Machine wash cold on gentle cycle. Warm iron while slightly damp.",
      productionLocation: "Karnal, Haryana",
      storySnippet: "Traditional Haryana baby Angrakha drafting & single-needle artisan tailoring.",
      impactNotes: "Provides year-round ethical tailoring livelihood for rural mothers.",
      primaryImage: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1000&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=85",
      ],
    },
    {
      name: "Hand-Stitched Neem-Stuffed Elephant Khadi Cushion for Kids",
      slug: "hand-stitched-neem-stuffed-elephant-khadi-cushion",
      sku: "PK-KID-002",
      shortDescription: "Soft, baby-safe handloom elephant cushion with natural anti-bacterial neem leaf & organic cotton filling.",
      description: "A gentle sensory companion for baby cribs and play corners. Hand-sewn by Sunita Devi's workshop from soft handspun khadi cotton, stuffed with organic cotton blended with dried organic neem leaves for natural pest and dust-mite resistance. Safe for toddlers to hug and cuddle.",
      price: 699,
      compareAtPrice: 999,
      costPrice: 360,
      inventory: 40,
      isPublished: true,
      isFeatured: true,
      categorySlug: "kids-apparel",
      makerId: sunita.id,
      material: "Handspun desi khadi cotton, dried neem leaves, organic cotton filling",
      dimensions: "28 cm length x 22 cm height",
      careInstructions: "Spot clean with damp cloth or sun-air every fortnight.",
      productionLocation: "Panipat, Haryana",
      storySnippet: "Traditional Haryana fabric animal toy sculpting with antibacterial botanical fill.",
      impactNotes: "Replaces synthetic petroleum-based polyester stuffed toys.",
      primaryImage: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1000&q=85",
      ],
    },

    // --- LIVING & HOME DECOR ---
    {
      name: "Hand-Hammered Rewari Brass Floral Tealight Holder",
      slug: "hand-hammered-rewari-brass-floral-tealight-holder",
      sku: "PK-DEC-001",
      shortDescription: "Heavyweight bell-metal tealight votive with hand-chiseled lotus petal rim and luminous reflective glow.",
      description: "Cast and hammered by Bimla Devi's artisan collective in historic Rewari. Crafted from pure alloy brass, the inner bowl is hand-buffed to create a radiant warm glow when a candle or diya is lit inside. An heirloom accent for festive dinner tables and mandir alcoves.",
      price: 890,
      compareAtPrice: 1250,
      costPrice: 470,
      inventory: 45,
      isPublished: true,
      isFeatured: true,
      categorySlug: "living-decor",
      makerId: bimla.id,
      material: "Pure unlacquered sand-cast brass (Rewari alloy)",
      dimensions: "10 cm diameter; 5 cm height; 280 grams weight",
      careInstructions: "Clean with brass polish or tamarind paste to maintain golden luster.",
      productionLocation: "Rewari, Haryana",
      storySnippet: "Sand-casting and repoussé chisel hammering in historic Rewari.",
      impactNotes: "Directly sustains fair wages for 8 women metal artisans.",
      primaryImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85",
      ],
    },
    {
      name: "Moonj Canal Grass Circular Wall Plate Medallion (14 Inch)",
      slug: "moonj-canal-grass-circular-wall-plate-medallion",
      sku: "PK-DEC-002",
      shortDescription: "Intricate spiral wall decor plate woven from wild riverbed Moonj grass with natural indigo dye accents.",
      description: "A statement piece of living craft for contemporary homes. Woven entirely by hand by Kamlesh Rani in Jhajjar over four days of rigorous coiling. Incorporates organic indigo-dyed grass strands forming concentric solar rings. Fitted with an invisible rear loop for effortless wall hanging.",
      price: 950,
      compareAtPrice: 1400,
      costPrice: 510,
      inventory: 30,
      isPublished: true,
      isFeatured: true,
      categorySlug: "living-decor",
      makerId: kamlesh.id,
      material: "Wild Moonj grass, natural botanical indigo dye, unbleached cotton cord",
      dimensions: "35 cm (14 inches) diameter; 4 cm depth",
      careInstructions: "Dust with a dry microfibre cloth. Avoid damp bathrooms.",
      productionLocation: "Jhajjar, Haryana",
      storySnippet: "Concentric spiral Moonj grass coil weaving by Kamlesh Rani.",
      impactNotes: "Zero industrial footprint; 100% biodegradable wild canal reed.",
      primaryImage: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=1000&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=85",
      ],
    },
  ];

  for (const p of newProducts) {
    const categoryId = categoryMap[p.categorySlug];
    if (!categoryId) {
      console.warn(`Category not found for slug: ${p.categorySlug}`);
      continue;
    }

    const created = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        sku: p.sku,
        shortDescription: p.shortDescription,
        description: p.description,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        costPrice: p.costPrice,
        inventory: p.inventory,
        isPublished: p.isPublished,
        isFeatured: p.isFeatured,
        categoryId: categoryId,
        makerId: p.makerId,
        material: p.material,
        dimensions: p.dimensions,
        careInstructions: p.careInstructions,
        productionLocation: p.productionLocation,
        storySnippet: p.storySnippet,
        impactNotes: p.impactNotes,
      },
      create: {
        name: p.name,
        slug: p.slug,
        sku: p.sku,
        shortDescription: p.shortDescription,
        description: p.description,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        costPrice: p.costPrice,
        inventory: p.inventory,
        isPublished: p.isPublished,
        isFeatured: p.isFeatured,
        categoryId: categoryId,
        makerId: p.makerId,
        material: p.material,
        dimensions: p.dimensions,
        careInstructions: p.careInstructions,
        productionLocation: p.productionLocation,
        storySnippet: p.storySnippet,
        impactNotes: p.impactNotes,
      },
    });

    // Clean old images and insert primary + gallery
    await prisma.productImage.deleteMany({ where: { productId: created.id } });

    await prisma.productImage.create({
      data: {
        productId: created.id,
        url: p.primaryImage,
        altText: `${p.name} - Handcrafted in Haryana by PeepalKrat`,
        isPrimary: true,
        order: 0,
      },
    });

    for (let i = 0; i < p.gallery.length; i++) {
      await prisma.productImage.create({
        data: {
          productId: created.id,
          url: p.gallery[i],
          altText: `${p.name} gallery view ${i + 1}`,
          isPrimary: false,
          order: i + 1,
        },
      });
    }

    console.log(`✨ Upserted product: ${p.name} (₹${p.price})`);
  }

  // 4. Link Curated Cross-Sell Recommendations for the new products
  const pOrnaments = await prisma.product.findUnique({ where: { slug: "rewari-brass-chime-terracotta-bauble-set" } });
  const pStar = await prisma.product.findUnique({ where: { slug: "rohtak-phulkari-velvet-star-ornaments" } });
  const pBunting = await prisma.product.findUnique({ where: { slug: "upcycled-handloom-cotton-triangle-bunting" } });
  const pToran = await prisma.product.findUnique({ where: { slug: "marigold-phulkari-pom-pom-doorway-toran" } });
  const pScrunchie = await prisma.product.findUnique({ where: { slug: "rohtak-phulkari-silk-embroidered-scrunchies-duo" } });
  const pHairPin = await prisma.product.findUnique({ where: { slug: "cold-beaten-brass-peepal-leaf-hair-pin" } });
  const pBirdCharm = await prisma.product.findUnique({ where: { slug: "haryana-folk-sparrow-bag-charm-tassel" } });
  const pMiniBasket = await prisma.product.findUnique({ where: { slug: "jhajjar-miniature-moonj-grass-basket-keychain" } });

  const recommendations = [
    { p1: pOrnaments?.id, p2: pStar?.id, badge: "Frequently Bought Together" },
    { p1: pBunting?.id, p2: pToran?.id, badge: "Complete the Festive Set" },
    { p1: pScrunchie?.id, p2: pHairPin?.id, badge: "Pairs Well With" },
    { p1: pBirdCharm?.id, p2: pMiniBasket?.id, badge: "Frequently Bought Together" },
  ];

  for (const r of recommendations) {
    if (r.p1 && r.p2) {
      await prisma.productRecommendation.upsert({
        where: {
          productId_recommendedProductId: {
            productId: r.p1,
            recommendedProductId: r.p2,
          },
        },
        update: { note: r.badge },
        create: {
          productId: r.p1,
          recommendedProductId: r.p2,
          note: r.badge,
        },
      });
    }
  }

  console.log("🌟 Novelty lines & circular categories seeded successfully!");
}

seedNoveltyLines()
  .catch((e) => {
    console.error("Error seeding novelty lines:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
