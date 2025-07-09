"use client";

import { useState } from "react";

interface Props {
  shortId: string;
}

export default function DeleteFileForm({ shortId }: Props) {
  const [deleting, setDeleting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const confirmDelete = confirm("Are you sure you want to delete this file?");
    if (!confirmDelete) return;

    setDeleting(true);

    try {
      const res = await fetch("/api/delete-file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shortId }),
      });

      if (res.ok) {
        alert("File deleted!")
        window.location.reload(); 
      } else {
        alert("Failed to delete file.");
      }
    } catch (error) {
      console.error("Delete error:", error);
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
        {deleting ? "Deleting..." : "Delete"}
      </button>
    </form>
  );
}
