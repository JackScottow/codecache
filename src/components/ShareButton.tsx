"use client";

import { useState } from "react";

export default function ShareButton({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/paste/${id}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button onClick={handleShare} className={`px-4 py-2 rounded-lg shadow-sm transition-all duration-300 ${copied ? "bg-stone-500 text-stone-50" : "bg-white/70 dark:bg-stone-700/70 text-stone-800 dark:text-stone-100 hover:bg-stone-400 hover:text-stone-50"}`}>
      {copied ? "Copied!" : "Share"}
    </button>
  );
}
