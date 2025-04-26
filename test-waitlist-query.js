// Script to test querying waitlist entries to verify all fields are returned
// Run with: node test-waitlist-query.js

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const { Amplify } = require('aws-amplify');
const { generateClient } = require('aws-amplify/api');
const outputs = require('./amplify_outputs.json');

// Initialize Amplify with outputs
console.log("Initializing Amplify...");
Amplify.configure(outputs);

// Create client with explicit IAM authorization mode
const client = generateClient({ authMode: 'iam' });

// Query for waitlist entries
async function queryWaitlistEntries() {
  try {
    console.log("Querying waitlist entries using IAM auth...");
    
    const result = await client.models.WaitlistEntry.list({
      limit: 10 // Limit to 10 entries for this test
    });
    
    if (result.data.length === 0) {
      console.log("⚠️ No waitlist entries found");
      return;
    }
    
    console.log(`✅ Found ${result.data.length} waitlist entries`);
    
    // Verify the first entry has all the expected fields
    const firstEntry = result.data[0];
    console.log("First entry details:");
    console.log(JSON.stringify(firstEntry, null, 2));
    
    // Check if all the fields are present
    const requiredFields = [
      'id', 'email', 'name', 'joinedAt', 'status', 
      'referralCode', 'referredBy', 'referralCount', 
      'position', 'tier', 'marketingOptIn'
    ];
    
    const missingFields = requiredFields.filter(field => !(field in firstEntry));
    
    if (missingFields.length > 0) {
      console.log(`❌ Missing fields: ${missingFields.join(', ')}`);
    } else {
      console.log("✅ All expected fields are present in the waitlist entries");
    }
    
    return result.data;
  } catch (error) {
    console.error("❌ Error querying waitlist entries:", error);
    throw error;
  }
}

// Run the test
queryWaitlistEntries()
  .then(() => console.log("Test completed"))
  .catch(err => console.error("Test failed:", err)); 