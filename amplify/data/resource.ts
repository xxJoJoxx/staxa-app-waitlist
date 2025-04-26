import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { emailHandler } from '../functions/email-handler/resource';

/*
 * Define the WaitlistEntry model for storing waitlist signups
 * This model will store email, name, and other relevant information
 */
const schema = a.schema({
  WaitlistEntry: a
    .model({
      email: a.string().required(),
      name: a.string(),
      joinedAt: a.datetime().required(),
      status: a.string().required(),
      // New fields for waitlist strategy
      referralCode: a.string(),
      referredBy: a.string(),
      referralCount: a.integer().default(0),
      position: a.integer(),
      tier: a.string(),
      marketingOptIn: a.boolean().default(true),
    })
    .authorization((allow) => [
      // Allow unauthenticated users to create entries AND read them for stats
      allow.guest().to(['create', 'read']),
      // Allow authenticated admins to do everything
      allow.authenticated().to(['create', 'read', 'update', 'delete']),
    ]),

  // Add our email handler as a custom query
  sendEmail: a
    .query()
    .arguments({
      to: a.string().required(),
      subject: a.string().required(),
      html: a.string().required(),
      from: a.string()
    })
    .returns(a.string()) // Simplified return type for now
    .authorization(allow => [allow.guest()])
    .handler(a.handler.function(emailHandler)),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
  },
});

/*
 * Client-side usage example:
 * 
 * import { generateClient } from "aws-amplify/data";
 * import type { Schema } from "@/amplify/data/resource";
 * 
 * const client = generateClient<Schema>();
 * 
 * // Create a new waitlist entry
 * const { data: newEntry } = await client.models.WaitlistEntry.create({
 *   email: "user@example.com",
 *   name: "User Name",
 *   joinedAt: new Date().toISOString(),
 *   status: "active",
 *   referralCode: "abc123",
 *   position: 1,
 *   tier: "founding"
 * });
 * 
 * // List all entries (admin only)
 * const { data: entries } = await client.models.WaitlistEntry.list();
 */

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
