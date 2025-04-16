import { Amplify } from 'aws-amplify';

// We'll import the config dynamically to avoid build errors

/**
 * Configure the Amplify library with the amplify configuration
 * Call this function at the highest level of your application
 */
export function configureAmplify() {
  try {
    // Try to use environment variable if available
    if (process.env.NEXT_PUBLIC_AMPLIFY_OUTPUTS) {
      const configFromEnv = JSON.parse(process.env.NEXT_PUBLIC_AMPLIFY_OUTPUTS);
      Amplify.configure(configFromEnv, {
        ssr: true // Enable for Next.js server-side rendering support
      });
      return;
    }
    
    // Otherwise use the JSON file (with dynamic import to avoid build errors)
    // @ts-ignore - Suppressing TypeScript error for dynamic import
    const defaultConfig = require('../../amplify_outputs.json');
    Amplify.configure(defaultConfig, {
      ssr: true // Enable for Next.js server-side rendering support
    });
  } catch (error) {
    console.warn('Error configuring Amplify:', error);
  }
} 