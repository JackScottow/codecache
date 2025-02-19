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
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{paste.title || "Untitled Paste"}</h1>
          <p className="text-sm text-gray-500">Created on {paste.createdAt.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <pre className="text-gray-900 dark:text-white whitespace-pre-wrap">{paste.content}</pre>
        </div>
      </div>
    </div>
  );
}
