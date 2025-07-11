"use client";

import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiCopy } from "react-icons/fi";

interface FileViewerProps {
  file: {
    name: string;
    url: string;
    shortId: string;
    type: string;         
  };
}

export default function FileViewer({ file }: FileViewerProps) {
  const [email, setEmail]   = useState("");
  const [password, setPassword] = useState("");
  const [sending, setSending]   = useState(false);

  const shortUrl =
    typeof window !== "undefined"
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/download/${file.shortId}`
      : "";

  /* -------- send email ---------- */
  const sendEmail = async () => {
    if (!email) return toast.error("Please enter an email.");
    try {
      setSending(true);
      const res = await fetch("/api/send-mails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, shortUrl, password }),
      });
      if (res.ok) {
        alert("Email sent successfully!");
      } else {
        toast.error("Failed to send email.");
      }
      if (res.ok) { setEmail(""); setPassword(""); }
    } catch (err) {
      toast.error("Something went wrong, try again.");
      console.error(err);
    } finally { setSending(false); }
  };

  /* -------- helper preview -------- */
  const renderPreview = () => {
    if (file.type.startsWith("image/")) {
      return (
        <Image
          src={file.url}
          alt={file.name}
          width={250}
          height={250}
          className="rounded-lg shadow-lg w-full h-auto object-contain"
        />
      );
    }

    if (file.type === "application/pdf") {
      return (
        <iframe
          src={file.url}
          title="PDF preview"
          width="100%"
          height="300"
          className="rounded-lg shadow-lg"
        />
      );
    }


    return (
      <div className="flex flex-col items-center gap-2 text-gray-600">
        <span className="text-4xl">📄</span>
        <span className="text-sm font-medium">{file.name}</span>
      </div>
    );
  };

  /* -------- JSX -------- */
  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-4xl mx-auto mt-10 border rounded-2xl p-6 shadow">
    
      <div className="w-full lg:w-1/2 flex flex-col items-center">
        <h1 className="text-xl font-semibold mb-4 truncate w-full text-center">
          File: {file.name}
        </h1>
        <div className="mb-4 w-full">{renderPreview()}</div>
      </div>

    
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold mb-6 text-center">
          <span className="border-b-2 border-white pb-1">File Link</span>
        </h1>

        <div className="w-full max-w-md">
          <div className="flex gap-2">
            <input
              value={shortUrl}
              readOnly
              className="flex-1 py-3 px-4 border text-gray-700 rounded-lg bg-gray-50 text-sm truncate"
            />
            <button
              title="Copy to clipboard"
              onClick={async () => {
                await navigator.clipboard.writeText(shortUrl);
                toast.success("Link copied!");
              }}
              className="p-3 bg-white text-black hover:bg-gray-700 hover:text-white rounded-lg transition"
            >
              <FiCopy size={18} />
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-2 text-center">
            Share this link to allow file downloads
          </p>

          <div className="mt-6 flex flex-col gap-2">
            <input
              type="email"
              placeholder="Recipient Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 border rounded text-sm bg-gray-50 text-gray-700"
            />
            <input
              type="text"
              placeholder="Password (optional)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 border rounded text-sm bg-gray-50 text-gray-700"
            />

            <button
              onClick={sendEmail}
              disabled={sending}
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
            >
              {sending ? "Sending..." : "Send Link via Email"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
