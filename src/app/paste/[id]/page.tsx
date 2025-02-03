import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const paste = await prisma.paste.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!paste) {
    return {
      title: "Paste Not Found",
    };
  }

  return {
    title: paste.title || "Untitled Paste",
  };
}

export default async function PastePage({ params }: PageProps) {
  // Await the params
  const resolvedParams = await params;

  const paste = await prisma.paste.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!paste) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">{paste.title || "Untitled"}</h1>
        <p className="text-gray-700">Created at: {paste.createdAt.toLocaleString()}</p>
      </div>
      <pre className="p-4 rounded overflow-x-auto w-full min-h-80 sm:min-h-40 bg-neutral-700">
        <code>{paste.content}</code>
      </pre>
    </main>
  );
}
