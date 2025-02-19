import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();

    if (!content?.trim()) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const paste = await prisma.paste.create({
      data: {
        title: title?.trim() || null,
        content: content.trim(),
      },
    });

    return NextResponse.json(paste, { status: 201 });
  } catch (error) {
    console.error("Failed to create paste:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const pastes = await prisma.paste.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(pastes);
  } catch (error) {
    console.error("Failed to fetch pastes:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
