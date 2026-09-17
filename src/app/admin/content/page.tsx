import React from "react";
import { prisma } from "@/lib/db";
import { PageContentCmsClient } from "@/components/admin/page-content-cms-client";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const blocks = await prisma.contentBlock.findMany({
    orderBy: [{ page: "asc" }, { order: "asc" }],
  });

  return <PageContentCmsClient initialBlocks={blocks as any} />;
}
