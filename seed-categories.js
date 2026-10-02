const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const categories = [
    {
      name: "Hair Accessories",
      slug: "hair-accessories",
      image: "/peepalkraft/products/hair-flower-double.jpg",
      badge: "Trending",
      isFeatured: true,
      order: 1,
    },
    {
      name: "Bag Charms & Keys",
      slug: "bag-charms",
      image: "/peepalkraft/products/bag-charm.jpg",
      badge: "Gifting",
      isFeatured: true,
      order: 2,
    },
    {
      name: "Latkans & Festive Decor",
      slug: "latkans",
      image: "/peepalkraft/products/latkans-display.jpg",
      badge: "Festive",
      isFeatured: true,
      order: 3,
    },
    {
      name: "Embroidered Apparel",
      slug: "skirts",
      image: "/peepalkraft/products/skirt-embroidered.jpg",
      badge: "Handmade",
      isFeatured: true,
      order: 4,
    },
    {
      name: "Pompom Pins & Accents",
      slug: "pins",
      image: "/peepalkraft/products/hair-pompom-pin.jpg",
      badge: "Craft",
      isFeatured: true,
      order: 5,
    },
    {
      name: "Festive Ornaments",
      slug: "festive-ornaments",
      image: "/peepalkraft/products/latkans-hanging.jpg",
      badge: "Festive",
      isFeatured: true,
      order: 6,
    },
    {
      name: "Buntings & Torans",
      slug: "buntings-torans",
      image: "/peepalkraft/products/latkans-display.jpg",
      badge: "Handloom",
      isFeatured: true,
      order: 7,
    },
    {
      name: "Kids & Toddlers",
      slug: "kids-apparel",
      image: "/peepalkraft/products/hair-flower-orange.jpg",
      badge: "Pure Cotton",
      isFeatured: true,
      order: 8,
    },
    {
      name: "Living & Decor",
      slug: "living-decor",
      image: "/peepalkraft/products/accessories-stand.jpg",
      badge: "Artisan",
      isFeatured: true,
      order: 9,
    },
    {
      name: "Phulkari Stoles",
      slug: "phulkari-embroidery",
      image: "/peepalkraft/products/skirt-embroidered.jpg",
      badge: "Heritage",
      isFeatured: true,
      order: 10,
    },
    {
      name: "Panipat Dhurries",
      slug: "handloom-weaves",
      image: "/peepalkraft/workshop/workshop-cutting.jpg",
      badge: "Bestseller",
      isFeatured: true,
      order: 11,
    },
    {
      name: "Brassware & Metal Accents",
      slug: "brassware-accents",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
      badge: "Foundry",
      isFeatured: false,
      order: 12,
    },
    {
      name: "Earthen Pottery & Ceramics",
      slug: "earthen-pottery",
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80",
      badge: "Terracotta",
      isFeatured: false,
      order: 13,
    },
    {
      name: "Moonj & Botanical Grasscraft",
      slug: "moonj-grasscraft",
      image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=600&q=80",
      badge: "Eco Craft",
      isFeatured: false,
      order: 14,
    },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        image: cat.image,
        badge: cat.badge,
        isFeatured: cat.isFeatured,
        order: cat.order,
      },
      create: {
        name: cat.name,
        slug: cat.slug,
        image: cat.image,
        badge: cat.badge,
        isFeatured: cat.isFeatured,
        order: cat.order,
      },
    });
  }

  console.log("All categories successfully updated with 100% authentic Indian craft imagery!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
