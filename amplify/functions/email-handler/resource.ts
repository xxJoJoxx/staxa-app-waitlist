import { defineFunction, secret } from '@aws-amplify/backend';

// Using named export to match the pattern used by auth and data resources
export const emailHandler = defineFunction({
  name: 'email-handler',

  environment: {
    RESEND_API_KEY: secret('RESEND_API_KEY'),
    RESEND_FROM_EMAIL: secret('RESEND_FROM_EMAIL')
  }
}); 