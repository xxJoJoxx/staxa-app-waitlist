// Script to test fetching waitlist stats similar to the API endpoint
// Run with: node test-waitlist-stats.js

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const { Amplify } = require('aws-amplify');
const { generateClient } = require('aws-amplify/api');
const outputs = require('./amplify_outputs.json');

// Initialize Amplify with outputs
console.log("Initializing Amplify with outputs:", Object.keys(outputs));
Amplify.configure(outputs);

// Initialize Amplify client with explicit IAM permissions
const client = generateClient({ authMode: 'iam' });

// Define tier capacities
const TIER_CAPACITY = {
  founding: 100,
  early: 400,
  priority: 500
};

async function getWaitlistStats() {
  console.log("Starting to fetch data");
  try {
    console.log("Auth mode: IAM");
    
    // Log model introspection data to debug table name issues
    if (outputs.data?.model_introspection?.models?.WaitlistEntry) {
      console.log("WaitlistEntry model found in introspection:", 
        JSON.stringify(Object.keys(outputs.data.model_introspection.models.WaitlistEntry)));
    } else {
      console.log("WaitlistEntry model not found in introspection");
    }
    
    // Get all waitlist entries using Amplify API
    console.log("Fetching data using Amplify API...");
    const entries = await client.models.WaitlistEntry.list({
      limit: 1000 // A reasonable limit to avoid pagination for now
    });
    
    console.log(`Fetched ${entries.data.length} entries from Amplify API`);
    
    // Initialize tier counts
    const tierCounts = {
      founding: 0,
      early: 0,
      priority: 0,
      standard: 0
    };
    
    // Process entries from Amplify API
    if (entries.data.length > 0) {
      console.log("First few entries:", JSON.stringify(entries.data.slice(0, 3)));
    }
    
    entries.data.forEach(entry => {
      console.log(`Processing entry: ${entry.email}, tier: ${entry.tier}`);
      if (entry.tier && entry.tier in tierCounts) {
        tierCounts[entry.tier]++;
      }
    });
    
    console.log("Tier counts:", tierCounts);
    
    // Calculate spots remaining for each tier
    const spotsRemaining = {
      founding: TIER_CAPACITY.founding - tierCounts.founding,
      early: TIER_CAPACITY.early - tierCounts.early,
      priority: TIER_CAPACITY.priority - tierCounts.priority
    };
    
    // Calculate progress percentages
    const percentageFilled = {
      founding: (tierCounts.founding / TIER_CAPACITY.founding) * 100,
      early: (tierCounts.early / TIER_CAPACITY.early) * 100,
      priority: (tierCounts.priority / TIER_CAPACITY.priority) * 100
    };
    
    return {
      success: true,
      stats: {
        totalEntries: entries.data.length,
        tierCounts,
        spotsRemaining,
        percentageFilled,
        tierCapacity: TIER_CAPACITY
      }
    };
  } catch (error) {
    console.error("Error fetching waitlist stats:", error);
    return {
      error: "Failed to fetch waitlist statistics",
      details: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

// Run the function
getWaitlistStats()
  .then(result => {
    console.log("Test result:", JSON.stringify(result, null, 2));
    console.log("Test completed");
  })
  .catch(err => console.error("Test failed:", err)); 