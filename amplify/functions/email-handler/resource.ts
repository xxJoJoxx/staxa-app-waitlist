import { defineFunction, secret } from '@aws-amplify/backend';

// Simple function definition following the docs example
export const emailHandler = defineFunction({
  // Use function name that matches the directory name
  name: 'email-handler', 
  // Explicit handler path
  entry: './handler.ts',
  environment: {
    RESEND_API_KEY: secret('RESEND_API_KEY'),
    RESEND_FROM_EMAIL: secret('RESEND_FROM_EMAIL')
  }
}); 