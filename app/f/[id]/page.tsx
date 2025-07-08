import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import FileViewer from "./FileViewer";

export default async function FilePage({ params }: { params: { id: string } }) {
  const file = await prisma.file.findUnique({
    where: { shortId: params.id },
  });

  if (!file) return notFound();

  return <FileViewer file={file} />;
}
