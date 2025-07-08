import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import FileViewer from "./FileViewer";

// Updated interface to match Next.js expectations
interface FilePageProps {
  params: {
    id: string;
  };
}

export default async function FilePage({ params }: FilePageProps) {
  const file = await prisma.file.findUnique({
    where: { shortId: params.id },
    select: {
      name: true,
      url: true,
      shortId: true,
    }
  });

  if (!file) return notFound();

  return <FileViewer file={file} />;
}