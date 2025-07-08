"use client";

import { useEffect, useState } from "react";
import FileViewer from "./FileViewer";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useSearchParams } from "next/navigation";

interface File {
  name: string;
  url: string;
  shortId: string;
  password: string | null;
}

export default function ClientFilePage({ file }: { file: File }) {
  const [passwordInput, setPasswordInput] = useState("");
  const [accessGranted, setAccessGranted] = useState(!file.password);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Get query parameters
  const searchParams = useSearchParams();
  const shared = searchParams.get("shared");

  useEffect(() => {
    if (shared === "true" && file.password) {
      setAccessGranted(true);
    }
  }, [shared, file.password]);

  // ⛔ Show password form if file is protected and access is not granted
  if (file.password && !accessGranted) {
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

  return <FileViewer file={file} />;
}
