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
  };
}

export default function FileViewer({ file }: FileViewerProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sending, setSending] = useState(false);

  const shortUrl =
    typeof window !== "undefined"
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/f/${file.shortId}`
      : "";

  const sendEmail = async () => {
    if (!email) {
      toast.error("Please enter an email.");
      return;
    }

    try {
      setSending(true);
      const res = await fetch("/api/send-mails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          shortUrl,
          password,
        }),
      });

      if (res.ok) {
        alert(" Email sent successfully!");
        setEmail("");
        setPassword("");
      } else {
        toast.error("Failed to send email.");
      }
    } catch (error) {
      toast.error("Something went wrong. Try again.");
      console.error("Email error:", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-4xl mx-auto mt-10 border rounded-2xl px-6 py-8 shadow bg-transparent">
      <div className="w-full lg:w-1/2 flex flex-col items-center">
        <h1 className="text-xl font-semibold mb-4 text-center truncate w-full">
          File: {file.name}
        </h1>

        <div className="mb-4 flex justify-center">
          <Image 
        src={file.url}
        alt={file.name}
        width={250}
        height={250}
        style={{ width: '100%', height: 'auto' }}
        className="rounded-lg shadow-lg"
      />
        </div>

        <a
          href={file.url}
          download
          className="mt-auto w-full max-w-xs hover:bg-blue-700 bg-blue-500  text-white text-center py-2 px-4 rounded-lg shadow transition"
        >
          Download File
        </a>
      </div>

      {/* Right Column - Link Sharing + Email */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold mb-6 text-center">
          <span className="border-b-2 border-white pb-1">File Link</span>
        </h1>

        <div className="w-full max-w-md">
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 py-3 px-4 border text-gray-700 rounded-lg bg-gray-50 text-sm truncate"
            />
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(shortUrl);
                alert("🔗 Link copied!");
              }}
              className="p-3 bg-white text-black hover:text-white hover:bg-gray-700 rounded-lg transition"
              title="Copy to clipboard"
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
              className="px-4 py-2 border text-gray-700 rounded text-sm bg-gray-50"
            />

            <input
              type="text"
              placeholder="Password (optional)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 border rounded text-gray-700 text-sm bg-gray-50"
            />

            <button
              onClick={sendEmail}
              disabled={sending}
              className="hover:bg-blue-700 bg-blue-500  text-white border-blue-500 px-4 py-2 rounded shadow transition"
            >
              {sending ? "Sending..." : "Send Link via Email"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
