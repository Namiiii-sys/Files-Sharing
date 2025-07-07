'use client';

import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/uploadthing.config";
import Image from 'next/image';

const Uploadform = () => {
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);

  return (
    <section className="text-center mt-10">
      <UploadButton<OurFileRouter, "uploadFile">
        endpoint="uploadFile"
        onClientUploadComplete={(res) => {
          console.log("✅ Uploaded:", res);

          const file = res?.[0];
          const fileUrl =
            file?.serverData?.uploadedUrl || `https://utfs.io/f/${file?.key}`;

          if (fileUrl) {
            setUploadedFileUrl(fileUrl);
          }

          alert("Upload successful!");
        }}
        onUploadError={(error: Error) => {
          console.error("❌ Upload failed:", error);
          alert(`Upload failed: ${error.message}`);
        }}
        appearance={{
          button: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full",
          container: "flex flex-col items-center gap-2",
        }}
      />

      {uploadedFileUrl && (
        <div className="mt-6 flex flex-col items-center">
          <p className="text-sm font-semibold text-gray-700">Preview:</p>
          <Image
            src={uploadedFileUrl}
            alt="Uploaded File"
            className="max-w-xs mt-2 rounded-md shadow-md"
          />
          <a
            href={uploadedFileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-blue-600 underline text-sm"
          >
            🔗 View/Share File
          </a>
        </div>
      )}
    </section>
  );
};

export default Uploadform;
