"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePasteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!content.trim()) {
      setError("Content is required");
      return;
    }

    try {
      const response = await fetch("/api/paste", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim() || null,
          content: content.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create paste");
      }

      if (data.id) {
        router.push(`/paste/${data.id}`);
      } else {
        throw new Error("No paste ID returned");
      }
    } catch (error) {
      console.error("Error creating paste:", error);
      setError(error instanceof Error ? error.message : "Failed to create paste");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Create new paste">
      <div>
        <input type="text" placeholder="Title (optional)" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 rounded bg-neutral-700 text-neutral-300" />
      </div>
      <div>
        <textarea id="content" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} className="w-full min-h-80 sm:min-h-40 p-2 rounded bg-neutral-700 text-neutral-300" required />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" className="bg-neutral-700 text-neutral-300 mx-auto px-4 py-2 rounded">
        Add to Cache
      </button>
    </form>
  );
}
