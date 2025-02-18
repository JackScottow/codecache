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
    <button onClick={handleShare} className="bg-neutral-700 text-neutral-300 px-3 py-1.5 my-2 rounded text-sm hover:bg-neutral-600 transition-colors">
      {copied ? "Copied!" : "Share"}
    </button>
  );
}
