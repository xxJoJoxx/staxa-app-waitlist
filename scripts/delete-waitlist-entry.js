/**
 * This script deletes a waitlist entry from the DynamoDB table by email or ID.
 * 
 * Usage:
 * node scripts/delete-waitlist-entry.js --email email@example.com
 * or
 * node scripts/delete-waitlist-entry.js --id waitlist_12345
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { 
  DynamoDBDocumentClient, 
  DeleteCommand, 
  QueryCommand, 
  ScanCommand 
} = require('@aws-sdk/lib-dynamodb');
const { fromSSO } = require('@aws-sdk/credential-providers');

// Parse command line arguments
const args = process.argv.slice(2);
let identifier = null;
let isEmail = false;

if (args.length >= 2) {
  if (args[0] === '--email') {
    identifier = args[1];
    isEmail = true;
  } else if (args[0] === '--id') {
    identifier = args[1];
    isEmail = false;
  }
}

if (!identifier) {
  console.error('Please provide an email or ID to delete');
  console.error('Usage:');
  console.error('  node scripts/delete-waitlist-entry.js --email email@example.com');
  console.error('  node scripts/delete-waitlist-entry.js --id waitlist_12345');
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

async function findEntryByEmail(email) {
  // Try to find the entry by email (first using index, then scan)
  try {
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
        return Items[0];
      }
    } catch (queryError) {
      console.log('Secondary index query failed, falling back to scan...');
    }
    
    const scanParams = {
      TableName: tableName,
      FilterExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    };
    
    const { Items } = await docClient.send(new ScanCommand(scanParams));
    
    if (Items && Items.length > 0) {
      return Items[0];
    }
    
    return null;
  } catch (error) {
    console.error('Error finding entry by email:', error);
    process.exit(1);
  }
}

async function deleteWaitlistEntry() {
  try {
    let id = identifier;
    let entryInfo = null;
    
    // If we're deleting by email, we need to find the ID first
    if (isEmail) {
      console.log(`Looking up entry with email: ${identifier}`);
      const entry = await findEntryByEmail(identifier);
      
      if (!entry) {
        console.error(`❌ No waitlist entry found with email: ${identifier}`);
        process.exit(1);
      }
      
      id = entry.id;
      entryInfo = entry;
      console.log(`Found entry with ID: ${id}`);
    }
    
    // Ask for confirmation
    console.log('Are you sure you want to delete this waitlist entry?');
    if (entryInfo) {
      console.log(`Email: ${entryInfo.email}`);
      console.log(`Name: ${entryInfo.name || 'Not provided'}`);
      console.log(`Joined: ${new Date(entryInfo.joinedAt).toLocaleString()}`);
    }
    console.log(`ID: ${id}`);
    
    // In a real application, you would prompt for confirmation
    // For now, we'll proceed with deletion
    console.log('Proceeding with deletion...');
    
    const params = {
      TableName: tableName,
      Key: {
        id: id,
      },
    };
    
    await docClient.send(new DeleteCommand(params));
    
    console.log(`✅ Successfully deleted waitlist entry with ${isEmail ? 'email' : 'ID'}: ${identifier}`);
  } catch (error) {
    console.error('Error deleting waitlist entry:', error);
    process.exit(1);
  }
}

// Run the function
deleteWaitlistEntry(); 