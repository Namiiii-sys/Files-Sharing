import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { auth } from "@clerk/nextjs/server";

function generateShortId(length = 6) {
  return crypto.randomBytes(length).toString("base64url").slice(0, length);
}

function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function POST(req: NextRequest) {
  console.log("[API] POST /api/save-file called");

  try {
    const { userId } = await auth(); // 
    if (!userId) {
      console.warn("No userId found from Clerk");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    console.log(" Received body:", body);

    const { name, type, size, url, password } = body;

    if (!name || !type || !size || !url) {
      console.error(" Missing required field(s):", { name, type, size, url });
      return NextResponse.json({ error: "Missing file fields." }, { status: 400 });
    }

    const shortId = generateShortId();
    console.log(" Generated shortId:", shortId);

    const savedFile = await prisma.file.create({
      data: {
        name,
        type,
        size,
        url,
        shortId,
        password: password ? hashPassword(password) : null,
        userId, // 
      },
    });

    console.log(" File saved in DB:", savedFile);

    return NextResponse.json({ id: savedFile.id, shortId }, { status: 201 });
  } catch (err) {
    console.error("Error in /api/save-file:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
