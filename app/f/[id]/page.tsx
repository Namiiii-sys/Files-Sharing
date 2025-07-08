import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import FileViewer from "./FileViewer";

// ✅ No custom type here — inline the props typing directly
export default async function FilePage({
  params,
}: {
  params: { id: string };
}) {
  const file = await prisma.file.findUnique({
    where: { shortId: params.id },
  });

  if (!file) return notFound();

  return <FileViewer file={file} />;
}
