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
  from: '"Sharedex" <namitamehra000@gmail.com>',
  to: email,
  subject: "📎 You've received a file!",
  html: `
    <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', sans-serif; background-color: #fdfdfd; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
      
      <!-- Banner -->
      <div style="background-color: #e0f0ff; padding: 24px; text-align: center;">
        <img src="https://cdn.wallpapersafari.com/55/76/5DyEKQ.jpg" alt="Sharedex Banner" width="100" style="margin-bottom: 12px;" />
        <h2 style="color: #2c3e50; font-size: 22px;">You've Received a File!</h2>
      </div>

      <!-- Content -->
      <div style="padding: 24px; color: #333;">
        <p style="font-size: 16px; margin-bottom: 16px;">
          Hey there 👋, someone just sent you a file using <strong>Sharedex</strong>.
        </p>

        <p style="font-size: 15px; margin-bottom: 12px;">
          🔗 <strong>File Link:</strong><br/>
          <a href="${shortUrl}" target="_blank" style="color: #007bff;">${shortUrl}</a>
        </p>

        ${
          password
            ? `<p style="font-size: 15px; margin-bottom: 12px;">
                🔐 <strong>Password:</strong> <code style="background-color: #f3f3f3; padding: 2px 6px; border-radius: 4px;">${password}</code>
              </p>`
            : ""
        }

        <div style="margin-top: 20px;">
          <a href="${shortUrl}" target="_blank" style="display: inline-block; padding: 12px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 6px; font-weight: 500;">
            View / Download File
          </a>
        </div>

        <p style="margin-top: 30px; font-size: 14px; color: #999;">
          If you don’t recognize this email, feel free to ignore it. <br />
          — Sent via <strong>Sharedex</strong>
        </p>
      </div>
    </div>
  `
};


    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error(" Email send error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
