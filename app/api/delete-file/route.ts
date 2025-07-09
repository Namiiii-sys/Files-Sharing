import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { shortId } = await req.json();

    if (!shortId) {
      return NextResponse.json({ error: "Missing shortId" }, { status: 400 });
    }

    await prisma.file.delete({
      where: { shortId },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(" Error deleting file:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
