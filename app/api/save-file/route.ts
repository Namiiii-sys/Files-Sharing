import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

// Utility: generate random short IDs
function generateShortId(length = 6) {
  return crypto.randomBytes(length).toString("base64url").slice(0, length);
}

// Utility: hash password if provided
function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function POST(req: NextRequest) {
  console.log("🟡 [API] POST /api/save-file called");

  try {
    const body = await req.json();
    console.log("📦 Received body:", body);

    const {
      name,
      type,
      size,
      url,
      password, // optional
    } = body;

    if (!name || !url || !size || !type) {
      console.error("❌ Missing file data in request");
      return NextResponse.json({ error: "Missing file data." }, { status: 400 });
    }

    const shortId = generateShortId();
    console.log("🔑 Generated shortId:", shortId);

    const saved = await prisma.file.create({
      data: {
        name,
        type,
        size,
        url,
        shortId,
        password: password ? hashPassword(password) : null,
      },
    });

    console.log("✅ File saved in DB:", saved);

    return NextResponse.json({ shortId });
  } catch (err: unknown) {
    console.error("🔥 Error in save-file route:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
