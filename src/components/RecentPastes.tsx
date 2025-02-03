import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function RecentPastes() {
  const recentPastes = await prisma.paste.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      content: true,
    },
  });

  return (
    <div className="space-y-3">
      {recentPastes.map((paste) => (
        <Link key={paste.id} href={`/paste/${paste.id}`} className="block p-3 bg-neutral-700 rounded hover:bg-neutral-600 transition-colors">
          <h3 className="text-neutral-300 font-medium mb-1">{paste.title || "Untitled"}</h3>
          <p className="text-sm text-neutral-400 mb-2">{new Date(paste.createdAt).toLocaleString()}</p>
          <p className="text-neutral-400 text-sm truncate">{paste.content}</p>
        </Link>
      ))}
      {recentPastes.length === 0 && <p className="text-neutral-400 text-center">No caches yet</p>}
    </div>
  );
}
