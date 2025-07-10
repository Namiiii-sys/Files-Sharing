"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  shortId: string;
  onSuccess?: (shortId: string) => void;
}

export default function DeleteFileForm({ shortId, onSuccess }: Props) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();              

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirm("Are you sure you want to delete this file?")) return;

    setDeleting(true);

    try {
      const res = await fetch("/api/delete-file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shortId }),
      });

      if (res.ok) {
        onSuccess?.(shortId);
        router.refresh();
        alert('File deleted! ')
      } else {
        alert("Failed to delete file.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error occurred while deleting.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        disabled={deleting}
        className="bg-red-600 hover:bg-red-800 text-sm rounded-full px-4 py-2 w-full mx-auto"
      >
        {deleting ? "Deleting…" : "Delete"}
      </button>
    </form>
  );
}
