'use client';

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/uploadthing.config";

const Uploadform = () => {
  return (
    <section className="text-center mt-10">
      <UploadButton<OurFileRouter, "uploadFile">
        endpoint="uploadFile"
        onClientUploadComplete={(res) => {
          console.log("✅ Uploaded:", res);
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
    </section>
  );
};

export default Uploadform;
