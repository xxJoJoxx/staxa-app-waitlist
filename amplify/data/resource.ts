import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

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
    })
    .authorization((allow) => [
      // Allow unauthenticated users to create entries but not read them
      allow.guest().to(['create']),
      // Allow authenticated admins to do everything
      allow.authenticated().to(['create', 'read', 'update', 'delete']),
    ]),
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
 *   status: "active"
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
