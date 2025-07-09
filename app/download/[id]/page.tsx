import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import DownloadClient from "./DownloadClient";

export default async function FilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const file = await prisma.file.findUnique({
    where: { shortId: id },
  });

  if (!file) return notFound();

  return <DownloadClient file={file} />;
}
