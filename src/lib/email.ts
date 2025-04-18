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
export async function sendWaitlistConfirmationEmail(to: string, name?: string) {
  try {
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

                    <!-- Features -->
                    <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                      <p style="color: #111827; font-weight: 600; margin: 0 0 12px;">With Staxa, you can:</p>
                      <ul style="color: #374151; margin: 0; padding-left: 24px;">
                        <li style="margin-bottom: 8px;">Deploy applications with AI assistance</li>
                        <li style="margin-bottom: 8px;">Manage your cloud infrastructure easily</li>
                        <li style="margin-bottom: 0;">Monitor your deployments in real-time</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Footer -->
                  <div style="text-align: center; padding: 24px 0;">
                    <p style="color: #6b7280; font-size: 14px; margin: 0;">
                      &copy; ${new Date().getFullYear()} Staxa. All rights reserved.
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