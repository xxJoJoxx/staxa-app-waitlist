import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with API key from environment variables
// In production, this will come from the Amplify secrets mechanism
// For local development, you'd use a .env.local file
const resendApiKey = process.env.RESEND_API_KEY || "";
const resend = new Resend(resendApiKey);

// Default FROM email address
const DEFAULT_FROM = process.env.RESEND_FROM_EMAIL || "onboarding@noreply.staxa.app";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Check for required fields
    if (!body.to || !body.subject || !body.html) {
      return NextResponse.json(
        { error: "Missing required fields: to, subject, or html" },
        { status: 400 }
      );
    }
    
    // Send email directly using Resend
    const { data, error } = await resend.emails.send({
      from: body.from || DEFAULT_FROM,
      to: body.to,
      subject: body.subject,
      html: body.html,
    });
    
    if (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
    
    return NextResponse.json({
      success: true,
      messageId: data?.id
    }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
} 