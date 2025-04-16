import { Amplify } from 'aws-amplify';
// Import the generated amplify_outputs.json from the root directory
import config from '../../amplify_outputs.json';

/**
 * Configure the Amplify library with the amplify configuration
 * Call this function at the highest level of your application
 */
export function configureAmplify() {
  Amplify.configure(config, {
    ssr: true // Enable for Next.js server-side rendering support
  });
} 