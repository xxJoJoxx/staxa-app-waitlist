import { Resend } from 'resend';
import type { Handler } from 'aws-lambda';
// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
const DEFAULT_FROM = process.env.RESEND_FROM_EMAIL || 'onboarding@noreply.staxa.app';

export const handler: Handler = async (event, context) => {
  console.log('Email handler received event:', JSON.stringify(event, null, 2));
  
  try {
    // Check if required fields are in the event
    if (!event.to || !event.subject || !event.html) {
      throw new Error('Missing required fields: to, subject, or html');
    }
    
    const { data, error } = await resend.emails.send({
      from: event.from || DEFAULT_FROM,
      to: event.to,
      subject: event.subject,
      html: event.html,
    });
    
    if (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        messageId: data?.id
      })
    };
  } catch (error: unknown) {
    console.error('Error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: errorMessage
      })
    };
  }
}; 