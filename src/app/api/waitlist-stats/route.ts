import { NextResponse } from "next/server"
import { generateClient } from "aws-amplify/api"
import { Schema } from "../../../../amplify/data/resource"
import { Amplify } from "aws-amplify"
import outputs from "../../../../amplify_outputs.json"
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb"

// Initialize Amplify directly
console.log("Initializing Amplify with outputs:", Object.keys(outputs));
Amplify.configure(outputs);

// Initialize Amplify client with explicit IAM permissions
const client = generateClient<Schema>({ authMode: 'iam' });

// Define tier capacities
const TIER_CAPACITY = {
  founding: 100,
  early: 400,
  priority: 500
};

export async function GET() {
  console.log("GET /api/waitlist-stats - Starting to fetch data");
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
    console.log("Trying to fetch data using Amplify API first...");
    const entries = await client.models.WaitlistEntry.list({
      limit: 1000 // A reasonable limit to avoid pagination for now
    });
    
    console.log(`GET /api/waitlist-stats - Fetched ${entries.data.length} entries from Amplify API`);
    
    // If no entries were found via Amplify API, try direct DynamoDB access
    let tierCounts = {
      founding: 0,
      early: 0,
      priority: 0,
      standard: 0
    };
    
    let totalEntries = entries.data.length;
    
    if (entries.data.length === 0) {
      console.log("No entries found via Amplify API. Trying direct DynamoDB access...");
      
      try {
        // Initialize DynamoDB client
        const region = outputs.data.aws_region || "us-east-1";
        const dynamoClient = new DynamoDBClient({ region });
        
        // Target the table where test data is confirmed to exist
        const tableName = "WaitlistEntry-4ptvcyxxsjfnzhgwy3r7ljasfi-NONE";
        
        // Scan for all entries
        const scanCommand = new ScanCommand({ 
          TableName: tableName,
          Limit: 1000
        });
        
        console.log(`Scanning table ${tableName} directly...`);
        const scanResult = await dynamoClient.send(scanCommand);
        
        console.log(`Found ${scanResult.Count || 0} entries via direct DB access`);
        
        // Process the results
        const dbEntries = scanResult.Items || [];
        totalEntries = dbEntries.length;
        
        // Process entries from DynamoDB
        dbEntries.forEach(item => {
          const tier = item.tier?.S;
          if (tier && tier in tierCounts) {
            tierCounts[tier as keyof typeof tierCounts]++;
          }
        });
        
        console.log("Tier counts from direct DB access:", tierCounts);
      } catch (dbError) {
        console.error("Error in direct DynamoDB access:", dbError);
        // Continue with Amplify data (which might be empty)
      }
    } else {
      // Process entries from Amplify API
      if (entries.data.length > 0) {
        console.log("First few entries:", JSON.stringify(entries.data.slice(0, 3)));
      }
      
      entries.data.forEach(entry => {
        console.log(`Processing entry: ${entry.email}, tier: ${entry.tier}`);
        if (entry.tier && entry.tier in tierCounts) {
          tierCounts[entry.tier as keyof typeof tierCounts]++;
        }
      });
      
      console.log("Tier counts from Amplify API:", tierCounts);
    }
    
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
    
    return NextResponse.json({
      success: true,
      stats: {
        totalEntries,
        tierCounts,
        spotsRemaining,
        percentageFilled,
        tierCapacity: TIER_CAPACITY
      }
    });
  } catch (error) {
    console.error("Error fetching waitlist stats:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch waitlist statistics",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
} 