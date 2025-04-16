import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { SESClient } from "@aws-sdk/client-ses";

// AWS Region and credentials configuration
const region = process.env.AWS_REGION || "us-east-1";

// Initialize the DynamoDB client
const ddbClient = new DynamoDBClient({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// Create a document client for easier DynamoDB operations
export const dynamoDb = DynamoDBDocumentClient.from(ddbClient);

// Initialize the SES client for email sending
export const sesClient = new SESClient({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// Table name constants
export const WAITLIST_TABLE = process.env.WAITLIST_TABLE || "StaxaWaitlist"; 