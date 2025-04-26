import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import type { Schema } from "../../amplify/data/resource";
import outputs from "../../amplify_outputs.json";

// Initialize Amplify with configuration
Amplify.configure(outputs);

// Generate the API client with our schema type
const client = generateClient<Schema>();

/**
 * Sends a waitlist confirmation email to the user
 */
export async function sendWaitlistConfirmationEmail(to: string, name?: string, referralCode?: string) {
  try {
    // Create the referral URL
    const referralUrl = referralCode 
      ? `${process.env.NEXT_PUBLIC_SITE_URL || 'https://staxa.dev'}?ref=${referralCode}`
      : null;

    // Create the HTML email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <title>Welcome to Staxa</title>
          <style>
            @media only screen and (max-width: 620px) {
              .content {
                padding: 24px !important;
              }
            }
          </style>
        </head>
        <body style="background-color: #f4f4f5; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; width: 100%; background-color: #f4f4f5; border-spacing: 0;">
            <tr>
              <td style="padding: 32px 0;">
                <div class="container" style="max-width: 600px; margin: 0 auto;">
                  <!-- Main content -->
                  <div class="content" style="background: #ffffff; border-radius: 12px; padding: 32px; box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);">
                    <!-- Logo -->
                    <div style="margin-bottom: 24px; text-align: center;">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #6366f1;">
                        <path d="m21 16-4 4-4-4"/>
                        <path d="M17 20V4"/>
                        <path d="m3 8 4-4 4 4"/>
                        <path d="M7 4v16"/>
                      </svg>
                      <h1 style="color: #111827; font-size: 24px; font-weight: 700; margin: 16px 0 0;">Welcome to Staxa!</h1>
                    </div>

                    <!-- Welcome message -->
                    <p style="color: #374151; font-size: 16px; line-height: 24px; margin: 0 0 24px;">
                      Hello ${name ? name : 'there'},
                    </p>
                    <p style="color: #374151; font-size: 16px; line-height: 24px; margin: 0 0 24px;">
                      Thank you for joining our waitlist! We're working hard to build an amazing product and can't wait to share it with you. We'll notify you as soon as you're granted access to Staxa.
                    </p>

                    ${referralUrl ? `
                    <!-- Referral Info -->
                    <div style="background-color: #eef2ff; border-radius: 8px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #6366f1;">
                      <p style="color: #111827; font-weight: 600; margin: 0 0 12px;">Want to move up the waitlist?</p>
                      <p style="color: #374151; margin: 0 0 12px;">Share your referral link with friends and get bumped up 5 spots for each person who joins!</p>
                      <div style="background-color: #ffffff; border-radius: 4px; border: 1px solid #e5e7eb; padding: 8px; margin-bottom: 16px; word-break: break-all;">
                        <a href="${referralUrl}" style="color: #4f46e5; text-decoration: none;">${referralUrl}</a>
                      </div>
                      <table border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                        <tr>
                          <td style="text-align: center;">
                            <a href="https://twitter.com/intent/tweet?text=I%20just%20joined%20the%20Staxa%20waitlist%20to%20get%20early%20access%20to%20simple%20cloud%20deployments!%20Join%20me:%20${encodeURIComponent(referralUrl)}" style="background-color: #4f46e5; color: #ffffff; padding: 8px 16px; border-radius: 4px; text-decoration: none; display: inline-block; font-weight: 500;">Share on Twitter</a>
                          </td>
                        </tr>
                      </table>
                    </div>
                    ` : ''}

                    <!-- Features -->
                    <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                      <p style="color: #111827; font-weight: 600; margin: 0 0 12px;">With Staxa, you can:</p>
                      <ul style="color: #374151; margin: 0; padding-left: 24px;">
                        <li style="margin-bottom: 8px;">Deploy applications with AI assistance</li>
                        <li style="margin-bottom: 8px;">Manage your cloud infrastructure easily</li>
                        <li style="margin-bottom: 0;">Monitor your deployments in real-time</li>
                      </ul>
                    </div>
                    
                    <!-- Exclusive Offer -->
                    <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                      <p style="color: #111827; font-weight: 600; margin: 0 0 12px;">Exclusive Waitlist Benefit:</p>
                      <p style="color: #374151; margin: 0 0 8px;">As an early supporter, you'll receive a lifetime discount on your subscription when we launch!</p>
                      <p style="color: #4f46e5; font-weight: 700; margin: 0;">Get up to 40% off our regular prices, forever.</p>
                    </div>
                  </div>

                  <!-- Footer -->
                  <div style="text-align: center; padding: 24px 0;">
                    <p style="color: #6b7280; font-size: 14px; margin: 0;">
                      &copy; ${new Date().getFullYear()} Staxa. All rights reserved.
                    </p>
                    <p style="color: #6b7280; font-size: 14px; margin: 8px 0 0;">
                      Don't want to receive updates? <a href="#" style="color: #4f46e5; text-decoration: underline;">Unsubscribe</a>
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    // Call the function using the Amplify client
    const { data, errors } = await client.queries.sendEmail({
      to,
      subject: 'Welcome to the Staxa Waitlist!',
      html: htmlContent
    });

    // Handle any GraphQL errors
    if (errors && errors.length > 0) {
      throw new Error(`GraphQL errors: ${errors.map(e => e.message).join(', ')}`);
    }

    // The response from the function is a string that needs to be parsed
    if (!data) {
      throw new Error('No data returned from the email function');
    }
    
    const result = JSON.parse(data);
    
    if (!result.success) {
      throw new Error(`Failed to send email: ${result.error}`);
    }

    return { success: true, messageId: result.messageId };
  } catch (error: unknown) {
    console.error('Error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
} 