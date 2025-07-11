import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

function generateShortId(length = 6) {
  return crypto.randomBytes(length).toString("base64url").slice(0, length);
}

function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function POST(req: NextRequest) {
  console.log(" [API] POST /api/save-file called");

  if (!process.env.DATABASE_URL) {
    console.error(" DATABASE_URL is not defined");
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  try {
    const body = await req.json();
    console.log(" Received body: ", body);

    const { name, type, size, url, password } = body;

  
    if (!name || !type || !size || !url) {
      console.error(" Missing required field(s):", {
        name,
        type,
        size,
        url,
      });

      return NextResponse.json(
        { error: "Missing one or more required file fields." },
        { status: 400 }
      );
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
      },
    });

    console.log(" File saved in DB:", savedFile);

     return NextResponse.json(
      { id: savedFile.id, shortId: shortId },
      { status: 201 } 
    );
  } catch (err) {
    console.error(" Error in /api/save-file:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
