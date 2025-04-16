import { NextResponse } from "next/server"
import { dynamoDb, WAITLIST_TABLE } from "@/lib/aws-config"
import { isValidEmail, generateId } from "@/lib/utils"
import { PutCommand } from "@aws-sdk/lib-dynamodb"
import { sendWaitlistConfirmationEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Generate a unique ID for this waitlist entry
    const id = generateId("waitlist")
    const timestamp = new Date().toISOString()

    // Save to DynamoDB
    try {
      await dynamoDb.send(
        new PutCommand({
          TableName: WAITLIST_TABLE,
          Item: {
            id,
            email,
            name: name || "",
            joinedAt: timestamp,
            status: "active",
          },
          // Prevent overwriting existing emails
          ConditionExpression: "attribute_not_exists(email)",
        })
      )
    } catch (error: any) {
      if (error.name === "ConditionalCheckFailedException") {
        return NextResponse.json(
          { error: "This email is already on our waitlist" },
          { status: 409 }
        )
      }
      throw error
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
