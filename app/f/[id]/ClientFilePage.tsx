"use client";
import FileViewer from "./FileViewer";

interface File {
  name: string;
  url: string;
  shortId: string;
  password: string | null;
}

export default function ClientFilePage({ file }: { file: File }) {
  return <FileViewer file={file} />;
}
