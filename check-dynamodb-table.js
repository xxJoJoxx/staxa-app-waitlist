// Script to check the DynamoDB table directly
// Run with: node check-dynamodb-table.js

require('dotenv').config({ path: '.env.local' });
const { DynamoDBClient, ListTablesCommand, ScanCommand } = require('@aws-sdk/client-dynamodb');
const { unmarshall } = require('@aws-sdk/util-dynamodb');

async function checkDynamoDBTable() {
  try {
    // Initialize DynamoDB client
    const region = 'us-east-1'; // Change to your region if different
    console.log(`Connecting to DynamoDB in ${region}...`);
    
    const dynamoClient = new DynamoDBClient({ region });
    
    // First, list all tables to find WaitlistEntry table
    console.log("Listing DynamoDB tables...");
    const listTablesResponse = await dynamoClient.send(new ListTablesCommand({}));
    
    console.log("Tables:", listTablesResponse.TableNames);
    
    // Find the waitlist table - it should contain "WaitlistEntry" in the name
    const waitlistTable = listTablesResponse.TableNames.find(name => name.includes("WaitlistEntry"));
    
    if (!waitlistTable) {
      console.log("❌ No WaitlistEntry table found");
      return;
    }
    
    console.log(`✅ Found waitlist table: ${waitlistTable}`);
    
    // Now scan the table to get entries
    console.log(`Scanning ${waitlistTable} table...`);
    const scanCommand = new ScanCommand({
      TableName: waitlistTable,
      Limit: 10,
    });
    
    const scanResponse = await dynamoClient.send(scanCommand);
    
    if (!scanResponse.Items || scanResponse.Items.length === 0) {
      console.log("⚠️ No items found in the table");
      return;
    }
    
    console.log(`✅ Found ${scanResponse.Items.length} items in the table`);
    
    // Convert the first item to a more readable format
    const firstItem = unmarshall(scanResponse.Items[0]);
    console.log("First item:", JSON.stringify(firstItem, null, 2));
    
    // Check if all required fields are present
    const requiredFields = [
      'id', 'email', 'name', 'joinedAt', 'status', 
      'referralCode', 'referredBy', 'referralCount', 
      'position', 'tier', 'marketingOptIn'
    ];
    
    const missingFields = requiredFields.filter(field => !(field in firstItem));
    
    if (missingFields.length > 0) {
      console.log(`❌ Missing fields: ${missingFields.join(', ')}`);
    } else {
      console.log("✅ All expected fields are present in the DynamoDB table");
    }
    
  } catch (error) {
    console.error("❌ Error checking DynamoDB table:", error);
  }
}

// Run the check
checkDynamoDBTable().then(() => console.log("Check completed")); 