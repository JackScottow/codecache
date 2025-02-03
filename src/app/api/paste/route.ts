import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Type definition for incoming POST request
interface PasteRequestBody {
  title?: string | null;
  content: string;
}

export async function POST(req: Request) {
  try {
    // Parse and validate input
    const body: PasteRequestBody = await req.json();
    const { title, content } = body;

    if (!content || typeof content !== "string" || !content.trim()) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    // Ensure title is a string or null
    const safeTitle = title && typeof title === "string" ? title.trim() : null;

    // Create paste
    const paste = await prisma.paste.create({
      data: {
        title: safeTitle,
        content: content.trim(),
      },
    });

    return NextResponse.json({ id: paste.id }, { status: 201 });
  } catch (err) {
    console.error("POST /api/paste error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const paste = await prisma.paste.findUnique({
        where: { id },
      });

      if (!paste) {
        return NextResponse.json({ error: "Paste not found" }, { status: 404 });
      }

      return NextResponse.json(paste, { status: 200 });
    }

    // Fetch latest 10 pastes
    const pastes = await prisma.paste.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    return NextResponse.json(pastes, { status: 200 });
  } catch (error) {
    console.error("GET /api/paste error:", error);
    return NextResponse.json({ error: "Error fetching pastes" }, { status: 500 });
  }
}
