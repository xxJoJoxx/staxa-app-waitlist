#!/bin/bash
set -e

# Configuration
STACK_NAME="staxa-waitlist"
ENVIRONMENT=${1:-dev}
REGION=${AWS_REGION:-us-east-1}
PROFILE=${AWS_PROFILE:-default}

echo "Deploying Staxa Waitlist infrastructure to AWS..."
echo "Environment: $ENVIRONMENT"
echo "Region: $REGION"
echo "AWS Profile: $PROFILE"

# Check if AWS SSO session is active
echo "Checking AWS SSO session..."
if ! aws sts get-caller-identity --profile "$PROFILE" &>/dev/null; then
  echo "AWS SSO session not active. Please login with: aws sso login --profile $PROFILE"
  exit 1
fi

# Create S3 bucket if it doesn't exist
BUCKET_NAME="staxa-$ENVIRONMENT-deployments"
if ! aws s3api head-bucket --bucket "$BUCKET_NAME" --profile "$PROFILE" 2>/dev/null; then
  echo "Creating S3 bucket: $BUCKET_NAME"
  aws s3api create-bucket --bucket "$BUCKET_NAME" --region "$REGION" \
    --create-bucket-configuration LocationConstraint="$REGION" \
    --profile "$PROFILE"
  
  # Enable versioning for the bucket
  aws s3api put-bucket-versioning --bucket "$BUCKET_NAME" \
    --versioning-configuration Status=Enabled \
    --profile "$PROFILE"
fi

# Deploy DynamoDB table
echo "Deploying DynamoDB table..."
aws cloudformation deploy \
  --template-file cloudformation/waitlist-table.yaml \
  --stack-name "$STACK_NAME-dynamodb" \
  --parameter-overrides EnvironmentName="$ENVIRONMENT" \
  --capabilities CAPABILITY_IAM \
  --region "$REGION" \
  --profile "$PROFILE"

echo "Deployment completed successfully!"
echo "Next steps:"
echo "1. Update .env.local with the correct table name: StaxaWaitlist-$ENVIRONMENT"
echo "2. Ensure your Resend API key is correctly set in your environment variables"
echo "3. Ensure your AWS SSO profile is correctly set up with the required permissions" 