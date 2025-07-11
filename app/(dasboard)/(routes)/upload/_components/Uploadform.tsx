"use client";

import { useState, useRef } from "react";
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function UploadForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [shortId, setShortId] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "file_upload");

    const isImage = selectedFile.type.startsWith("image/");
    const resourceType = isImage ? "image" : "raw";

    try {
      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/dqgkqacb8/${resourceType}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await cloudRes.json();

      if (!data.secure_url) {
        console.error("Upload to Cloudinary failed:", data);
        toast.error("Upload failed");
        setUploading(false);
        return;
      }

      const secureUrl = data.secure_url;
      setImageUrl(secureUrl);

      const saveRes = await fetch("/api/save-file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: selectedFile.name,
          type: selectedFile.type,
          size: selectedFile.size,
          url: secureUrl,
          password: password || null,
        }),
      });

      const saveData = await saveRes.json();

      if (saveRes.ok && saveData.shortId && saveData.id) {
        setShortId(saveData.shortId);
        setId(saveData.id)
        alert("File uploaded and saved!");
      } else {
        alert(saveData.error || "Failed to save file");
      }

      

    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Something went wrong during upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className="bg-white/10 backdrop-blur-sm hover:bg-white/20 dark:bg-gray-800/30 dark:hover:bg-gray-800/50 text-center px-4 py-8 rounded-lg flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed dark:border-gray-600 transition-colors"
        onClick={() => inputRef.current?.click()}
      >
        <div className="py-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 mb-4 fill-blue-600 dark:fill-blue-400 inline-block"
            viewBox="0 0 32 32"
          >
            <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
            <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
          </svg>
          <h4 className="text-base font-semibold text-blue-600 dark:text-blue-300">
            Drag and drop files here
          </h4>
        </div>

        <hr className="w-full border-gray-300 dark:border-gray-600 my-2" />

        <div className="py-6">
          <input
            ref={inputRef}
            type="file"
            name="file"
            accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileSelect}
            className="hidden"
          />
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-4">
            PNG, JPG, SVG, WEBP, PDF, DOCX, and GIF are allowed. (2 MB)
          </p>
        </div>
      </div>

      {selectedFile && !imageUrl && (
        <div className="mt-4 text-center flex flex-col gap-2">
          <input
            type="text"
            placeholder="Set a password (optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded text-sm text-gray-700 dark:text-gray-300 dark:bg-gray-800 dark:border-gray-600"
          />

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      )}

      {imageUrl && shortId && (
        <div className="mt-6 text-center">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Preview:</p>

          <div className="bg-white/20 dark:bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            {selectedFile?.type === "application/pdf" ? (
              <iframe
                src={imageUrl}
                width="100%"
                height="300"
                className="rounded-md shadow max-w-full"
              />
            ) : selectedFile?.type.startsWith("image/") ? (
              <Image
                src={imageUrl}
                width={200}
                height={200}
                alt="Uploaded"
                className="mx-auto rounded-md shadow max-w-full h-auto"
                style={{ maxHeight: "300px", width: "auto" }}
              />
            ) : (
              <div className="flex flex-col items-center mt-4">
                <div className="text-gray-600 dark:text-gray-400 text-4xl mb-2">📄</div>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium break-all">{selectedFile?.name}</p>
              </div>
            )}

            <a
              href={`/f/${id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 font-semibold block mt-3 text-md hover:underline"
            >
              🔗 View / Download
            </a>
          </div>
        </div>
      )}
    </div>
  );
}