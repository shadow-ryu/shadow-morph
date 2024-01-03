import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { updateUser } from "@/lib/actions/user.actions";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
// Resource: https://clerk.com/docs/integration/webhooks#supported-events
// Above document lists the supported events
type EventType = "user.created" | "user.updated" | "user.deleted";

type Event = {
  data: Record<string, string | number | Record<string, string>[]>;
  object: "event";
  type: EventType;
};

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new SVIX instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);
  switch (evt.type) {
    case "user.created":
    case "user.updated":
      const {
        id,
        first_name,
        last_name,
        email_addresses,
        image_url,
        username,
      } = evt.data;
      console.log(
        id,
        first_name,
        last_name,
        email_addresses,
        image_url,
        username
      );
      // @ts-ignore
      let user = await db
      .insert(users)
      .values(
        {
          id:id, // Assuming id should be an array
          username: username?.toLowerCase() || first_name.toLowerCase(),
          name: first_name,
          email: email_addresses[0]?.email_address,
          image: image_url,
          is_setup: false,
          bio: "",
          interests: "",
        }
      )
      .onConflictDoUpdate({
        target: users.id,
        set: {
          email: email_addresses[0]?.email_address,
          image: image_url,
          username: username?.toLowerCase() || first_name.toLowerCase(),
        },
        where: eq(users.id, id), // Assuming id should be an array
      });
    

      break;

    case "user.deleted":
      console.log(evt.data);
      break;

    default:
      console.log("hitt");
      break;
  }

  return new Response("", { status: 201 });
}
