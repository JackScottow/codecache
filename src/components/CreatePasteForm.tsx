"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePasteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/pastes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title || null, content }),
      });

      if (!res.ok) throw new Error("Failed to create paste");

      const data = await res.json();
      router.push(`/paste/${data.id}`);
    } catch (error) {
      console.error("Failed to create paste:", error);
      alert("Failed to create paste. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <input type="text" placeholder="Title (optional)" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
      </div>
      <div>
        <textarea required placeholder="Paste your content here..." value={content} onChange={(e) => setContent(e.target.value)} className="w-full h-64 px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none" />
      </div>
      <button type="submit" disabled={isLoading} className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
        {isLoading ? "Creating..." : "Create Paste"}
      </button>
    </form>
  );
}
