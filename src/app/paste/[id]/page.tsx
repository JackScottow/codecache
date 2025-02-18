// app/paste/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ShareButton from "@/components/ShareButton";
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
  const resolvedParams = await params;

  const paste = await prisma.paste.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!paste) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2 text-neutral-300">{paste.title || "Untitled"}</h1>
          <p className="text-neutral-400">Created at: {paste.createdAt.toLocaleString()}</p>
        </div>
      </div>
      <pre className="p-4 bg-neutral-700 rounded overflow-x-auto">
        <code className="text-neutral-300">{paste.content}</code>
      </pre>
      <ShareButton id={paste.id} />
    </main>
  );
}
