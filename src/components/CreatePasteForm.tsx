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
    <form onSubmit={onSubmit} className="space-y-4 p-6 ">
      <div>
        <input type="text" placeholder="Title (optional)" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-stone-500 bg-stone-500/50 text-stone-100 shadow-sm focus:ring-2 focus:ring-stone-400 outline-none transition-all" />
      </div>
      <div>
        <textarea required placeholder="Paste your content here..." value={content} onChange={(e) => setContent(e.target.value)} className="w-full h-64 px-4 py-2 rounded-lg border border-stone-500 bg-stone-500/50 text-stone-100 resize-none shadow-sm focus:ring-2 focus:ring-stone-400 outline-none transition-all" />
      </div>
      <button type="submit" disabled={isLoading} className="w-full px-4 py-2 bg-stone-400 text-stone-900 rounded-lg hover:bg-stone-500 hover:text-stone-50 disabled:opacity-50 shadow-sm hover:shadow transition-all">
        {isLoading ? "Creating..." : "Create Paste"}
      </button>
    </form>
  );
}
