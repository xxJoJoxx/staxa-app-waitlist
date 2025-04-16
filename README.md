# Staxa App Waitlist

A waitlist application for the Staxa cloud deployment platform.

## Features

- Modern UI built with Next.js and TailwindCSS
- AWS integration for backend services
- DynamoDB for data storage
- SES for email notifications
- CloudFormation templates for infrastructure deployment

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn
- AWS CLI configured with your credentials
- An AWS account with appropriate permissions

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
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key

# DynamoDB Tables
WAITLIST_TABLE=StaxaWaitlist-dev

# SES Configuration
SES_FROM_EMAIL=noreply@yourdomain.com
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## AWS Infrastructure Setup

### Creating DynamoDB Table

1. Navigate to the AWS directory
```bash
cd aws
```

2. Run the deployment script
```bash
./deploy.sh dev
```

This will create:
- An S3 bucket for deployments
- A DynamoDB table for waitlist entries

### Configuring Amazon SES

1. Verify your domain in the AWS SES console
2. Follow the DNS configuration instructions to verify domain ownership
3. Update your `.env.local` file with the correct `SES_FROM_EMAIL` value

## Production Deployment

To deploy to production:

1. Update the environment variables for production
2. Run the deployment script with the prod environment:
```bash
cd aws
./deploy.sh prod
```

3. Deploy the application to your hosting service (Vercel, AWS Amplify, etc.)

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

- Use IAM roles with least privilege
- Store AWS credentials securely
- Consider using AWS Cognito for user authentication in future iterations
- Enable encryption at rest for the DynamoDB table

## License

[MIT](LICENSE)
