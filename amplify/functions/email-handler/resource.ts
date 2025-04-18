import { defineFunction } from '@aws-amplify/backend';

// Simple function definition following the docs example
export const emailHandler = defineFunction({
  // Use function name that matches the directory name
  name: 'email-handler', 
  // Explicit handler path
  entry: './handler.ts'
}); 