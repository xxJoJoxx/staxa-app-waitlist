#!/bin/bash
set -e

# Configuration
STACK_NAME="staxa-waitlist"
ENVIRONMENT=${1:-dev}
REGION=${AWS_REGION:-us-east-1}

echo "Deploying Staxa Waitlist infrastructure to AWS..."
echo "Environment: $ENVIRONMENT"
echo "Region: $REGION"

# Create S3 bucket if it doesn't exist
BUCKET_NAME="staxa-$ENVIRONMENT-deployments"
if ! aws s3api head-bucket --bucket "$BUCKET_NAME" 2>/dev/null; then
  echo "Creating S3 bucket: $BUCKET_NAME"
  aws s3api create-bucket --bucket "$BUCKET_NAME" --region "$REGION" \
    --create-bucket-configuration LocationConstraint="$REGION"
  
  # Enable versioning for the bucket
  aws s3api put-bucket-versioning --bucket "$BUCKET_NAME" \
    --versioning-configuration Status=Enabled
fi

# Deploy DynamoDB table
echo "Deploying DynamoDB table..."
aws cloudformation deploy \
  --template-file cloudformation/waitlist-table.yaml \
  --stack-name "$STACK_NAME-dynamodb" \
  --parameter-overrides EnvironmentName="$ENVIRONMENT" \
  --capabilities CAPABILITY_IAM \
  --region "$REGION"

# Verify SES domain
# Note: This part requires manual verification through AWS Console
echo "Ensure that your SES domain is verified in the AWS Console"
echo "You need to add DNS records to verify your domain for sending emails"

echo "Deployment completed successfully!"
echo "Next steps:"
echo "1. Update .env.local with the correct table name: StaxaWaitlist-$ENVIRONMENT"
echo "2. Verify your SES domain for sending emails"
echo "3. Create an IAM user with appropriate permissions and update credentials" 