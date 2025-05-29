import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { unstable_noStore } from "next/cache";

export default async function RecentPastes() {
  // Prevent caching of this component
  unstable_noStore();

  const recentPastes = await prisma.paste.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });

  if (recentPastes.length === 0) {
    return (
      <div className="bg-white/50 dark:bg-stone-600/50 backdrop-blur-sm rounded-lg p-6 text-center shadow-md border border-stone-300 dark:border-stone-500">
        <p className="text-stone-700 dark:text-stone-200">No pastes yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {recentPastes.map((paste) => (
        <Link key={paste.id} href={`/paste/${paste.id}`} className="block bg-stone-500/50 backdrop-blur-sm rounded-lg p-4 transition-all shadow-sm hover:shadow-md border border-stone-500 hover:border-stone-400 hover:bg-stone-600/70">
          <h3 className="font-medium text-stone-800 dark:text-stone-100 mb-1">{paste.title || "Untitled"}</h3>
          <p className="text-sm text-stone-600 dark:text-stone-300 mb-2">{new Date(paste.createdAt).toLocaleString()}</p>
          <div className="bg-white/70 dark:bg-stone-700/70 rounded-lg overflow-x-auto shadow-inner border border-stone-300 dark:border-stone-500">
            <pre className="text-stone-800 dark:text-stone-100 whitespace-pre-wrap p-3 text-sm line-clamp-2">{paste.content}</pre>
          </div>
        </Link>
      ))}
    </div>
  );
}
