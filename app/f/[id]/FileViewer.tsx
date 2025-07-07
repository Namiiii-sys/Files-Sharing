'use client';
import toast from "react-hot-toast";
import { FiCopy } from "react-icons/fi";
import Image from "next/image";

type Props = {
  file: {
    name: string;
    url: string;
    shortId: string;
  };
};

export default function FileViewer({ file }: Props) {
  const shortUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/f/${file.shortId}`
      : "";

  return (
    <div className="flex flex-row gap-10 max-w-2xl mx-auto mt-10 border rounded-2xl p-8 shadow bg-transparent">
      <div className="w-1/2">
        <h1 className="text-xl font-semibold text-center mb-4">📁 File: {file.name}</h1>

        <Image
          src={file.url}
          alt={file.name}
          width={250}
          height={250}
          className="rounded shadow mx-auto max-h-80"
        />

        <a
          href={file.url}
          download
          className="mt-4 block bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded shadow transition"
        >
          Download File
        </a>
      </div>

      <div className="mt-6 text-sm text-center w-1/2 flex flex-col justify-center gap-3">
        <p className="mb-1">🔗 File Link:</p>

        <input
          type="text"
          readOnly
          value={shortUrl}
          className="w-full text-xs px-2 py-2 border rounded text-center bg-transparent"
        />

        <FiCopy
          onClick={async () => {
            await navigator.clipboard.writeText(shortUrl);
            toast.success("📋 Link copied to clipboard!");
          }}
          className="text-white px-4 py-2 rounded shadow transition"
        />
          
       
      </div>
    </div>
  );
}
