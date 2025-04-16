/**
 * This script creates a DynamoDB table for local development and testing.
 * Run this script with Node.js to create the required table in your AWS account.
 * 
 * Usage:
 * node scripts/create-local-dynamodb.js
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const { DynamoDBClient, CreateTableCommand, ListTablesCommand } = require('@aws-sdk/client-dynamodb');
const { fromSSO } = require('@aws-sdk/credential-providers');

// AWS Region and credentials configuration
const region = process.env.AWS_REGION || 'us-east-1';
const tableName = process.env.WAITLIST_TABLE || 'StaxaWaitlist';

// Create a DynamoDB client with SSO authentication
const client = new DynamoDBClient({
  region,
  credentials: fromSSO({ profile: process.env.AWS_PROFILE || undefined }),
});

async function createTable() {
  console.log(`Checking if table ${tableName} exists...`);
  
  // Check if table already exists
  try {
    const { TableNames } = await client.send(new ListTablesCommand({}));
    
    if (TableNames.includes(tableName)) {
      console.log(`Table ${tableName} already exists!`);
      return;
    }
  } catch (error) {
    console.error('Error checking tables:', error);
    process.exit(1);
  }
  
  // Table definition
  const params = {
    TableName: tableName,
    BillingMode: 'PAY_PER_REQUEST',
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'S'
      },
      {
        AttributeName: 'email',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: 'HASH'
      }
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'EmailIndex',
        KeySchema: [
          {
            AttributeName: 'email',
            KeyType: 'HASH'
          }
        ],
        Projection: {
          ProjectionType: 'ALL'
        }
      }
    ]
  };
  
  // Create the table
  try {
    console.log(`Creating table ${tableName}...`);
    const data = await client.send(new CreateTableCommand(params));
    console.log('Table created successfully:', data.TableDescription.TableName);
  } catch (error) {
    console.error('Error creating table:', error);
    process.exit(1);
  }
}

createTable(); 