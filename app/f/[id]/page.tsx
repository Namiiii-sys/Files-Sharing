import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ClientFilePage from "./ClientFilePage";

export default async function FilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const file = await prisma.file.findUnique({
    where: { id: id },
  });

  if (!file) return notFound();

  return <ClientFilePage file={file} />;
}
