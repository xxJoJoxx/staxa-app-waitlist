import type { Handler } from 'aws-lambda';
import { Resend } from 'resend';
import type { Schema } from '../../data/resource';

// Getting API key from environment
const resendApiKey = process.env.RESEND_API_KEY || '';
const resend = new Resend(resendApiKey);

// Default FROM email address
const DEFAULT_FROM = process.env.RESEND_FROM_EMAIL || 'onboarding@noreply.staxa.app';

// Type for the handler matching our sendEmail query in the schema
export const handler: Schema['sendEmail']['functionHandler'] = async (event) => {
  console.log('Email handler received event:', JSON.stringify(event, null, 2));
  
  try {
    // Get arguments from the event
    const { to, subject, html, from } = event.arguments;
    
    // Send email with Resend
    const { data, error } = await resend.emails.send({
      from: from || DEFAULT_FROM,
      to,
      subject,
      html,
    });
    
    if (error) {
      console.error('Error sending email:', error);
      return JSON.stringify({ success: false, error: error.message });
    }
    
    return JSON.stringify({ success: true, messageId: data?.id });
  } catch (error: any) {
    console.error('Error sending email:', error);
    
    return JSON.stringify({ 
      success: false, 
      error: error.message || 'Unknown error'
    });
  }
}; 