"use client";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Image from "next/image";

interface Props {
  file: {
    name: string;
    url: string;
    shortId: string;
    password: string | null;
    type: string;
  };
}

export default function DownloadClient({ file }: Props) {
  const [passwordInput, setPasswordInput] = useState("");
  const [accessGranted, setAccessGranted] = useState(!file.password);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/verify-pass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shortId: file.shortId,
        password: passwordInput,
      }),
    });

    const result = await res.json();
    if (result.success) {
      setAccessGranted(true);
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      
      // Fetch the file as blob
      const response = await fetch(file.url);
      if (!response.ok) {
        throw new Error('Failed to fetch file');
      }
      
      const blob = await response.blob();
      
      // Create blob URL
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Create temporary anchor element
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = file.name;
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up blob URL
      window.URL.revokeObjectURL(blobUrl);
      
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (file.password && !accessGranted) {
    return (
      <div className="max-w-md mx-auto mt-20 px-6">
        <h1 className="text-xl font-bold mb-4 text-center">
          This file is password-protected
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full px-4 py-2 pr-10 border rounded"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-2.5 right-3 text-gray-600"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4 text-center">
      <h2 className="text-xl font-semibold mb-4">{file.name}</h2>
      
      {file.type.startsWith("image/") && (
        <div className="flex justify-center">
          <Image
            src={file.url}
            alt={file.name}
            width={400}
            height={300}
            className="mx-auto max-h-96 rounded shadow object-contain"
            style={{ maxHeight: "24rem", width: "auto", height: "auto" }}
            unoptimized
          />
        </div>
      )}

      {file.type === "application/pdf" && (
        <iframe
          src={file.url}
          width="100%"
          height="400"
          className="rounded border"
        />
      )}

      {file.type.startsWith("application/") && !file.type.includes("pdf") && (
        <div className="flex flex-col items-center mt-4">
          <div className="text-4xl mb-2">📄</div>
          <p className="text-sm text-gray-700 font-medium">{file.name}</p>
        </div>
      )}

      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="inline-block mt-6 bg-blue-600 text-white px-6 py-2 mb-8 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isDownloading ? "Downloading..." : "Download"}
      </button>
    </div>
  );
}