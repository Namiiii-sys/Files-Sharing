import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import FileViewer from "./FileViewer";

interface FilePageProps {
  params: {
    id: string;
  };
}

export default async function FilePage({ params }: FilePageProps) {
  const file = await prisma.file.findUnique({
    where: { shortId: params.id },
  });

  if (!file) return notFound();

  return <FileViewer file={file} />;
}
