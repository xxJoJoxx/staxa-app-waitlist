import { NextResponse } from "next/server"
import { isValidEmail } from "@/lib/utils"
import { sendWaitlistConfirmationEmail } from "@/lib/email"
import { generateClient } from "aws-amplify/api"
import { Schema } from "../../../../amplify/data/resource"
import { Amplify } from "aws-amplify"
import outputs from "../../../../amplify_outputs.json"

// Initialize Amplify directly
Amplify.configure(outputs);

// Initialize Amplify client
const client = generateClient<Schema>()

export async function POST(request: Request) {
  try {
    const { email, name, referralCode, marketingOptIn } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Generate a timestamp for the waitlist entry
    const timestamp = new Date().toISOString()
    
    // Generate a unique referral code
    const generatedReferralCode = generateReferralCode(email)

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
      
      // Check for referrer and increment their referral count
      let position = null
      if (referralCode) {
        try {
          // Look up the referrer by their code
          const referrers = await client.models.WaitlistEntry.list({
            filter: {
              referralCode: {
                eq: referralCode
              }
            }
          })
          
          if (referrers.data.length > 0) {
            const referrer = referrers.data[0]
            const referralCount = (referrer.referralCount || 0) + 1
            
            // Update the referrer's record with the new count
            await client.models.WaitlistEntry.update({
              id: referrer.id,
              referralCount,
              // Improve their position by 5 spots for each referral
              position: Math.max(1, (referrer.position || 0) - 5)
            })
            
            // The referred user gets a slightly better position than normal
            position = await getNextPosition() - 2
          }
        } catch (referralError) {
          console.error("Error processing referral:", referralError)
          // Continue with signup even if referral processing fails
        }
      }
      
      // If position is still null, get the next sequential position
      if (position === null) {
        position = await getNextPosition()
      }

      // Create the waitlist entry in the database
      await client.models.WaitlistEntry.create({
        email,
        name: name || "",
        joinedAt: timestamp,
        status: "active",
        referralCode: generatedReferralCode,
        referralCount: 0,
        referredBy: referralCode || null,
        marketingOptIn: marketingOptIn !== false, // Default to true if not provided
        position: position,
        tier: determineWaitlistTier(position),
      })
    } catch (dbError) {
      console.error("Database error:", dbError)
      throw dbError
    }

    // Send confirmation email using Resend
    try {
      await sendWaitlistConfirmationEmail(email, name, generatedReferralCode)
    } catch (emailError) {
      // Log email errors but don't fail the request
      console.error("Error sending confirmation email:", emailError)
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Successfully joined waitlist", 
        referralCode: generatedReferralCode
      },
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

// Helper function to generate a referral code
function generateReferralCode(email: string): string {
  const encodedEmail = Buffer.from(email.toLowerCase().trim()).toString('base64')
  return encodedEmail.substring(0, 8) + Math.floor(Math.random() * 1000).toString().padStart(3, '0')
}

// Helper function to get the next position in the waitlist
async function getNextPosition(): Promise<number> {
  try {
    // Get all entries to find the highest position
    const entries = await client.models.WaitlistEntry.list({
      limit: 100
    })
    
    if (entries.data.length === 0) {
      return 1
    }
    
    // Find the highest position manually
    let highestPosition = 0
    for (const entry of entries.data) {
      const position = entry.position || 0
      if (position > highestPosition) {
        highestPosition = position
      }
    }
    
    return highestPosition + 1
  } catch (error) {
    console.error("Error getting next position:", error)
    // Default to a high number if there's an error
    return 1000
  }
}

// Determine the tier based on position
function determineWaitlistTier(position: number): string {
  if (position <= 100) {
    return "founding"
  } else if (position <= 500) {
    return "early"
  } else if (position <= 1000) {
    return "priority"
  } else {
    return "standard"
  }
}
