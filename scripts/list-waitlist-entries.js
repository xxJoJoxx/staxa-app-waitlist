/**
 * This script lists all entries in the DynamoDB waitlist table.
 * 
 * Usage:
 * node scripts/list-waitlist-entries.js [limit]
 * 
 * Optional:
 * [limit] - Maximum number of entries to return (default: 100)
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const { fromSSO } = require('@aws-sdk/credential-providers');

// Get optional limit from command line arguments
const limit = parseInt(process.argv[2], 10) || 100;

// AWS Region and table configuration
const region = process.env.AWS_REGION || 'us-east-1';
const tableName = process.env.WAITLIST_TABLE || 'StaxaWaitlist';

// Create DynamoDB clients
const client = new DynamoDBClient({
  region,
  credentials: fromSSO({ profile: process.env.AWS_PROFILE || undefined }),
});

const docClient = DynamoDBDocumentClient.from(client);

async function listWaitlistEntries() {
  console.log(`Retrieving up to ${limit} entries from the '${tableName}' table...`);
  
  try {
    const params = {
      TableName: tableName,
      Limit: limit,
    };
    
    const { Items, Count, ScannedCount } = await docClient.send(new ScanCommand(params));
    
    if (Items && Items.length > 0) {
      console.log(`✅ Found ${Count} waitlist entries (scanned ${ScannedCount} items):`);
      console.log('\n--------------------------------------------------------------');
      
      Items.forEach((item, index) => {
        const date = new Date(item.joinedAt).toLocaleString();
        console.log(`${index + 1}. Email: ${item.email}`);
        console.log(`   Name: ${item.name || 'Not provided'}`);
        console.log(`   Joined: ${date}`);
        console.log(`   ID: ${item.id}`);
        console.log('--------------------------------------------------------------');
      });
      
      return Items;
    } else {
      console.log('❌ No entries found in the waitlist table.');
      return [];
    }
  } catch (error) {
    console.error('Error listing waitlist entries:', error);
    process.exit(1);
  }
}

// Run the function
listWaitlistEntries(); 