"use client";

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Image from "next/image";

interface File {
  name: string;
  url: string;
  shortId: string;
  password: string | null;
}

export default function DownloadClient({ file }: { file: File }) {
  const [passwordInput, setPasswordInput] = useState("");
  const [accessGranted, setAccessGranted] = useState(!file.password);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleDownload = async () => {
  try {
    const response = await fetch(file.url);
    const blob = await response.blob();
    
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = file.name;
    link.style.display = "none";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
   
    URL.revokeObjectURL(link.href);
    
  } catch (error) {
    console.error("Download failed:", error);
    

    const link = document.createElement("a");
    link.href = file.url;
    link.download = file.name;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

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

  if (!accessGranted && file.password) {
    return (
      <div className="max-w-md mx-auto mt-20 px-6">
        <h1 className="text-xl font-bold mb-4 text-center">
          This file is password-protected
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              required
              className="w-full px-4 py-2 pr-10 border rounded bg-white text-black"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-2.5 right-3 text-gray-500"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
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

  // ✅ After password is verified or no password
  return (
    <div className="max-w-md mx-auto mt-20 px-6 text-center">
      <h1 className="text-xl font-semibold mb-4">Ready to download:</h1>

      <Image
        src={file.url}
        alt={file.name}
        width={300}
        height={300}
        className="rounded shadow mx-auto mb-6"
        style={{ height: "auto", width: "auto" }}
      />

      <button
        onClick={handleDownload}
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded shadow transition"
      >
        ⬇ Download File
      </button>
    </div>
  );
}
