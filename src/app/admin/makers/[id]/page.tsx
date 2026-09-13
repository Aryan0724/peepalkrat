import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { MakerForm } from "@/components/admin/maker-form";

export const dynamic = "force-dynamic";

export default async function AdminEditMakerPage({
  params,
}: {
  params: { id: string };
}) {
  const maker = await prisma.maker.findUnique({
    where: { id: params.id },
  });

  if (!maker) notFound();

  return <MakerForm initialMaker={maker} />;
}
