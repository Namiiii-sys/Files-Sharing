"use client";
import { useState, useRef } from "react";
import Image from 'next/image'

export default function UploadForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "file_upload");

    const cloudRes = await fetch("https://api.cloudinary.com/v1_1/dqgkqacb8/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await cloudRes.json();
    const secureUrl = data.secure_url;
    setImageUrl(secureUrl);

    await fetch("/api/save-file", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size,
        url: secureUrl,
      }),
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div
        className="bg-transparent text-center px-4 rounded flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed"
        onClick={() => inputRef.current?.click()}
      >
        <div className="py-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 mb-4 fill-blue-600 inline-block"
            viewBox="0 0 32 32"
          >
            <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
            <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
          </svg>
          <h4 className="text-base font-semibold text-blue-300">
            Drag and drop files here
          </h4>
        </div>

        <hr className="w-full border-gray-300 my-2" />

        <div className="py-6">
          <input
            ref={inputRef}
            type="file"
            name="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <p className="text-xs text-slate-500 mt-4">
            PNG, JPG, SVG, WEBP, and GIF are allowed.
          </p>
        </div>
      </div>

      {selectedFile && !imageUrl && (
        <div className="mt-4 text-center">
          <button
            onClick={handleUpload}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow"
          >
            Upload
          </button>
        </div>
      )}

      {imageUrl && (
        <div className="mt-6 text-center">
          <p className="text-sm font-medium text-slate-700 mb-2">Preview:</p>
          <Image
            src={imageUrl}
            width={200}
            height={200}
            alt="Uploaded"
            className="mx-auto rounded-md shadow"
          />
          <a
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline block mt-2 text-sm"
          >
            🔗 View / Share
          </a>
        </div>
      )}
    </div>
  );
}