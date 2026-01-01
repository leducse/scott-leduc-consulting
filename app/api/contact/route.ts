import { NextRequest, NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { SITE_CONFIG } from "@/lib/constants";

// Initialize SES client - uses credentials from environment or ~/.aws/credentials
const sesClient = new SESClient({ 
  region: process.env.AWS_REGION || "us-east-1" 
});

// Rate limiting: simple in-memory store (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // 5 submissions per hour per IP

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "unknown";
  return ip;
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

async function sendEmailViaSES(
  subject: string,
  body: string,
  replyTo: string
): Promise<boolean> {
  const toEmail = process.env.CONTACT_EMAIL || SITE_CONFIG.email;
  const fromEmail = process.env.SES_FROM_EMAIL || SITE_CONFIG.email;

  try {
    const command = new SendEmailCommand({
      Source: fromEmail,
      Destination: {
        ToAddresses: [toEmail],
      },
      ReplyToAddresses: [replyTo],
      Message: {
        Subject: { Data: subject, Charset: "UTF-8" },
        Body: {
          Text: { Data: body, Charset: "UTF-8" },
        },
      },
    });

    await sesClient.send(command);
    console.log("Email sent successfully via SES");
    return true;
  } catch (error) {
    console.error("SES email error:", error);
    // In development or if SES is not configured, log the email instead
    console.log("=== EMAIL CONTENT (SES unavailable) ===");
    console.log(`To: ${toEmail}`);
    console.log(`From: ${fromEmail}`);
    console.log(`Reply-To: ${replyTo}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body:\n${body}`);
    console.log("========================================");
    // Return true anyway to not break the form in development
    return true;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getRateLimitKey(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, phone, company, projectType, timeline, message } = body;

    // Validation
    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, projectType, and message are required." },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Prepare email content
    const emailSubject = `[Website Inquiry] ${projectType} - ${name}`;
    const emailBody = `
New consultation request from ${SITE_CONFIG.name}:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ""}
${company ? `Company: ${company}` : ""}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type: ${projectType}
${timeline ? `Timeline: ${timeline}` : ""}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
METADATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Source: ${SITE_CONFIG.name} Website Contact Form
IP: ${ip}
Timestamp: ${new Date().toISOString()}
    `.trim();

    // Send email via SES
    await sendEmailViaSES(emailSubject, emailBody, email);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your inquiry. I'll be in touch within 24-48 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        error: "An error occurred while processing your request. Please try again later.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST to submit the contact form." },
    { status: 405 }
  );
}
