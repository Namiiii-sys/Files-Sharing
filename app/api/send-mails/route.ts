import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email, shortUrl, password } = await req.json();

  if (!email || !shortUrl) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
   });


    const mailOptions = {
    from: '"Namita from Sharedex" <namitamehra000@gmail.com>',
    to: email,
    subject: "📎 You've received a file!",
    text: `Hey! Someone sent you a file:\n\n🔗 ${shortUrl}\n${
    password ? `Password: ${password}` : ""
    }\n\nVisit the link to view or download.\n\n- Sent via FileDrop`,
};

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error(" Email send error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
