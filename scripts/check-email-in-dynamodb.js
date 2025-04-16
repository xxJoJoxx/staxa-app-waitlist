/**
 * This script queries DynamoDB to check if a specific email exists in the waitlist table.
 * 
 * Usage:
 * node scripts/check-email-in-dynamodb.js email@example.com
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, QueryCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const { fromSSO } = require('@aws-sdk/credential-providers');

// Get the email from command line arguments
const emailToCheck = process.argv[2];

if (!emailToCheck) {
  console.error('Please provide an email address to check');
  console.error('Usage: node scripts/check-email-in-dynamodb.js email@example.com');
  process.exit(1);
}

// AWS Region and table configuration
const region = process.env.AWS_REGION || 'us-east-1';
const tableName = process.env.WAITLIST_TABLE || 'StaxaWaitlist';

// Create DynamoDB clients
const client = new DynamoDBClient({
  region,
  credentials: fromSSO({ profile: process.env.AWS_PROFILE || undefined }),
});

const docClient = DynamoDBDocumentClient.from(client);

async function checkEmailInWaitlist(email) {
  console.log(`Checking if email '${email}' exists in table '${tableName}'...`);
  
  try {
    // Method 1: Try to query using the secondary index if it exists
    try {
      const queryParams = {
        TableName: tableName,
        IndexName: 'EmailIndex',
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: {
          ':email': email,
        },
      };
      
      const { Items } = await docClient.send(new QueryCommand(queryParams));
      
      if (Items && Items.length > 0) {
        console.log('✅ Email found in the waitlist!');
        console.log('Entry details:');
        console.log(JSON.stringify(Items[0], null, 2));
        return true;
      }
    } catch (queryError) {
      console.log('Secondary index query failed, falling back to scan...');
      // If the index doesn't exist or there's another issue, we'll fall back to scan
    }
    
    // Method 2: Scan the table (less efficient but works without an index)
    const scanParams = {
      TableName: tableName,
      FilterExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    };
    
    const { Items } = await docClient.send(new ScanCommand(scanParams));
    
    if (Items && Items.length > 0) {
      console.log('✅ Email found in the waitlist!');
      console.log('Entry details:');
      console.log(JSON.stringify(Items[0], null, 2));
      return true;
    }
    
    console.log('❌ Email not found in the waitlist.');
    return false;
  } catch (error) {
    console.error('Error checking email in DynamoDB:', error);
    process.exit(1);
  }
}

// Run the function
checkEmailInWaitlist(emailToCheck); 