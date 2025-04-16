import { NextResponse } from "next/server"
import { isValidEmail } from "@/lib/utils"
import { sendWaitlistConfirmationEmail } from "@/lib/email"
import { generateClient } from "aws-amplify/api"
import { Schema } from "../../../../amplify/data/resource"
import { Amplify } from "aws-amplify"
import amplifyOutputs from "../../../../amplify_outputs.json"

// Initialize Amplify directly
Amplify.configure(amplifyOutputs);

// Initialize Amplify client
const client = generateClient<Schema>()

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Generate a timestamp for the waitlist entry
    const timestamp = new Date().toISOString()

    try {
      // Check if email already exists using a direct query
      const existingEntries = await client.models.WaitlistEntry.list({
        filter: {
          email: {
            eq: email
          }
        }
      })

      if (existingEntries.data.length > 0) {
        return NextResponse.json(
          { error: "This email is already on our waitlist" },
          { status: 409 }
        )
      }

      // Create the waitlist entry
      await client.models.WaitlistEntry.create({
        email,
        name: name || "",
        joinedAt: timestamp,
        status: "active",
      })
    } catch (dbError) {
      console.error("Database error:", dbError)
      throw dbError
    }

    // Send confirmation email using Resend
    try {
      await sendWaitlistConfirmationEmail(email, name)
    } catch (emailError) {
      // Log email errors but don't fail the request
      console.error("Error sending confirmation email:", emailError)
    }

    return NextResponse.json(
      { success: true, message: "Successfully joined waitlist" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Waitlist error:", error)
    return NextResponse.json(
      { error: "Failed to join waitlist" },
      { status: 500 }
    )
  }
}
