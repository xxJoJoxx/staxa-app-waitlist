import { NextResponse } from "next/server";
import { Amplify } from "aws-amplify";
import outputs from "../../../../../amplify_outputs.json";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

// Define tier capacities
const TIER_CAPACITY = {
  founding: 100,
  early: 400,
  priority: 500
};

/**
 * This endpoint bypasses Amplify Data to directly access the DynamoDB table
 * where waitlist entries are stored.
 */
export async function GET() {
  try {
    console.log("GET /api/waitlist-stats/force-correct-table - Starting direct DB access");
    
    // Initialize Amplify with outputs
    Amplify.configure(outputs);
    
    // Initialize DynamoDB client
    const region = outputs.data.aws_region || "us-east-1";
    const dynamoClient = new DynamoDBClient({ region });
    
    // Target the table where test data is confirmed to exist
    const tableName = "WaitlistEntry-4ptvcyxxsjfnzhgwy3r7ljasfi-NONE";
    
    // Scan for all entries
    const scanCommand = new ScanCommand({ 
      TableName: tableName,
      Limit: 1000 // Get up to 1000 entries
    });
    
    console.log(`Scanning table ${tableName} directly...`);
    const scanResult = await dynamoClient.send(scanCommand);
    
    console.log(`Found ${scanResult.Count || 0} entries in ${tableName}`);
    
    // Process the results
    const entries = scanResult.Items || [];
    
    // Count entries by tier
    const tierCounts = {
      founding: 0,
      early: 0,
      priority: 0,
      standard: 0
    };
    
    // Process entries
    entries.forEach(item => {
      const tier = item.tier?.S;
      if (tier && tier in tierCounts) {
        tierCounts[tier as keyof typeof tierCounts]++;
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
    
    return NextResponse.json({
      success: true,
      stats: {
        totalEntries: entries.length,
        tierCounts,
        spotsRemaining,
        percentageFilled,
        tierCapacity: TIER_CAPACITY
      }
    });
  } catch (error) {
    console.error("Error fetching waitlist stats directly:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch waitlist statistics directly",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
} 