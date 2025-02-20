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
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400">No pastes yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {recentPastes.map((paste) => (
        <Link key={paste.id} href={`/paste/${paste.id}`} className="block bg-white dark:bg-gray-800 rounded-lg p-4 hover:ring-2 ring-blue-500 transition-all">
          <h3 className="font-medium text-gray-900 dark:text-white mb-1">{paste.title || "Untitled"}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{new Date(paste.createdAt).toLocaleString()}</p>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{paste.content}</p>
        </Link>
      ))}
    </div>
  );
}
