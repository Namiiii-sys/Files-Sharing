import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import FileViewer from "./FileViewer";

type Props = {
  params: { id: string };
};

export default async function FilePage({ params }: Props) {
  const file = await prisma.file.findUnique({
    where: { shortId: params.id },
  });

  if (!file) return notFound();

  return <FileViewer file={file} />;
}
