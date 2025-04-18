import type { Handler } from 'aws-lambda';
import { Resend } from 'resend';

// Getting API key from environment
const resendApiKey = process.env.RESEND_API_KEY || '';
const resend = new Resend(resendApiKey);

// Default FROM email address
const DEFAULT_FROM = process.env.RESEND_FROM_EMAIL || 'onboarding@noreply.staxa.app';

export const handler: Handler = async (event) => {
  console.log('Email handler received event:', JSON.stringify(event, null, 2));
  
  try {
    // Check for required fields
    if (!event.to || !event.subject || !event.html) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields: to, subject, or html' })
      };
    }
    
    // Send email with Resend
    const { data, error } = await resend.emails.send({
      from: event.from || DEFAULT_FROM,
      to: event.to,
      subject: event.subject,
      html: event.html,
    });
    
    if (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, error: error.message })
      };
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, messageId: data?.id })
    };
  } catch (error: any) {
    console.error('Error sending email:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        error: error.message || 'Unknown error'
      })
    };
  }
}; 