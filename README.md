# Staxa App Waitlist

A waitlist application for the Staxa cloud deployment platform.

## Features

- Modern UI built with Next.js and TailwindCSS
- AWS integration for backend services
- DynamoDB for data storage
- Resend for transactional emails
- CloudFormation templates for infrastructure deployment

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn
- AWS CLI configured with SSO authentication
- An AWS account with appropriate permissions
- A Resend account for email sending

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd staxa-app-waitlist
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
# AWS Configuration
AWS_REGION=us-east-1
# For AWS SSO authentication
AWS_PROFILE=default

# DynamoDB Tables
WAITLIST_TABLE=StaxaWaitlist-dev

# Resend Configuration
RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## AWS SSO Configuration

### Setting up AWS SSO

1. Configure AWS CLI with SSO:
```bash
aws configure sso
```

2. Follow the prompts to authenticate with your AWS SSO portal

3. Verify your SSO configuration works:
```bash
aws sts get-caller-identity --profile your-sso-profile
```

4. Start an SSO session before running the application:
```bash
aws sso login --profile your-sso-profile
```

5. Update your `.env.local` file with the correct profile name:
```
AWS_PROFILE=your-sso-profile
```

## Resend Email Configuration

1. Sign up for a Resend account at [resend.com](https://resend.com)

2. Verify your domain ownership in the Resend dashboard

3. Create an API key in the Resend dashboard

4. Update your `.env.local` file with your Resend API key and verified domain email:
```
RESEND_API_KEY=re_123456789
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

## AWS Infrastructure Setup

### Creating DynamoDB Table

1. Ensure you have an active AWS SSO session:
```bash
aws sso login --profile your-sso-profile
```

2. Navigate to the AWS directory
```bash
cd aws
```

3. Run the deployment script
```bash
./deploy.sh dev
```

This will create:
- An S3 bucket for deployments
- A DynamoDB table for waitlist entries

## Production Deployment

To deploy to production:

1. Ensure you have an active AWS SSO session for the production account
2. Update the environment variables for production
3. Run the deployment script with the prod environment:
```bash
cd aws
./deploy.sh prod
```

4. Deploy the application to your hosting service (Vercel, AWS Amplify, etc.)

## API Documentation

### Waitlist API

**Endpoint**: `/api/waitlist`
**Method**: POST
**Body**:
```json
{
  "name": "John Doe", // optional
  "email": "john@example.com" // required
}
```

**Success Response**:
```json
{
  "success": true,
  "message": "Successfully joined waitlist"
}
```

**Error Responses**:
- 400: Invalid request (missing email, invalid format)
- 409: Email already exists in waitlist
- 500: Server error

## Security Considerations

- Use IAM roles with least privilege through AWS SSO
- Ensure your SSO session is active before deployment or local development
- Store your Resend API key securely in environment variables
- Consider using AWS Cognito for user authentication in future iterations
- Enable encryption at rest for the DynamoDB table

## License

[MIT](LICENSE)
