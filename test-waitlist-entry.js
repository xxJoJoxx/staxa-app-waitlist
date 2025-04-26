// Script to test creating a waitlist entry with all fields
// Run with: node test-waitlist-entry.js

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const { Amplify } = require('aws-amplify');
const { generateClient } = require('aws-amplify/api');
const outputs = require('./amplify_outputs.json');

// Initialize Amplify with outputs
console.log("Initializing Amplify...");
Amplify.configure(outputs);

// Create client
const client = generateClient();

// Function to generate a random email for testing
function generateRandomEmail() {
  return `test-${Math.floor(Math.random() * 10000)}@example.com`;
}

// Create a test waitlist entry
async function createTestEntry() {
  const testEmail = generateRandomEmail();
  
  try {
    console.log(`Creating test entry with email: ${testEmail}`);
    
    const result = await client.models.WaitlistEntry.create({
      email: testEmail,
      name: "Test User",
      joinedAt: new Date().toISOString(),
      status: "active",
      referralCode: "TEST123",
      referredBy: null,
      referralCount: 0,
      position: 1000,
      tier: "standard",
      marketingOptIn: true
    });
    
    console.log("✅ Test entry created successfully!");
    console.log("Entry details:", JSON.stringify(result.data, null, 2));
    return result.data;
  } catch (error) {
    console.error("❌ Error creating test entry:", error);
    throw error;
  }
}

// Run the test
createTestEntry()
  .then(() => console.log("Test completed"))
  .catch(err => console.error("Test failed:", err)); 