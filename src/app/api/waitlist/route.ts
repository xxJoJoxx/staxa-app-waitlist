import { NextResponse } from "next/server"
import { dynamoDb, sesClient, WAITLIST_TABLE } from "@/lib/aws-config"
import { isValidEmail, generateId } from "@/lib/utils"
import { PutCommand } from "@aws-sdk/lib-dynamodb"
import { SendEmailCommand } from "@aws-sdk/client-ses"

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

    // Send confirmation email
    try {
      const sesFromEmail = process.env.SES_FROM_EMAIL
      
      if (sesFromEmail) {
        await sesClient.send(
          new SendEmailCommand({
            Destination: {
              ToAddresses: [email],
            },
            Message: {
              Body: {
                Html: {
                  Charset: "UTF-8",
                  Data: `
                    <html>
                      <body>
                        <h1>Welcome to Staxa Waitlist</h1>
                        <p>Hello ${name || "there"},</p>
                        <p>Thank you for joining our waitlist! We'll notify you as soon as we launch.</p>
                        <p>Best regards,<br>The Staxa Team</p>
                      </body>
                    </html>
                  `,
                },
                Text: {
                  Charset: "UTF-8",
                  Data: `Hello ${name || "there"},\n\nThank you for joining our waitlist! We'll notify you as soon as we launch.\n\nBest regards,\nThe Staxa Team`,
                },
              },
              Subject: {
                Charset: "UTF-8",
                Data: "Welcome to Staxa Waitlist",
              },
            },
            Source: sesFromEmail,
          })
        )
      }
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
