// app/paste/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const paste = await prisma.paste.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!paste) {
    return { title: "Paste Not Found" };
  }

  return { title: paste.title || "Untitled Paste" };
}

export default async function PastePage({ params }: PageProps): Promise<React.ReactElement> {
  const resolvedParams = await params;
  const paste = await prisma.paste.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!paste) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-4">
        <div className="p-6 bg-white/40 dark:bg-stone-800/40 backdrop-blur-sm rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-stone-800 dark:text-stone-100">{paste.title || "Untitled Paste"}</h1>
          <p className="text-sm text-stone-600 dark:text-stone-300">Created on {paste.createdAt.toLocaleString()}</p>
          <div className="mt-4 bg-white/70 dark:bg-stone-700/70 rounded-lg p-4 overflow-x-auto shadow-inner border border-stone-300 dark:border-stone-500">
            <pre className="text-stone-800 dark:text-stone-100 whitespace-pre-wrap p-3 rounded">{paste.content}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
