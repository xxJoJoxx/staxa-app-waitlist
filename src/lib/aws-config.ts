import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { fromSSO } from "@aws-sdk/credential-providers";

// AWS Region configuration
const region = process.env.AWS_REGION || "us-east-1";

// Initialize the DynamoDB client with SSO credentials
const ddbClient = new DynamoDBClient({
  region,
  credentials: fromSSO({ profile: process.env.AWS_PROFILE || undefined }),
});

// Create a document client for easier DynamoDB operations
export const dynamoDb = DynamoDBDocumentClient.from(ddbClient);

// Table name constants
export const WAITLIST_TABLE = process.env.WAITLIST_TABLE || "StaxaWaitlist"; 