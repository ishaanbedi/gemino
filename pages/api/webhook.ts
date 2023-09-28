import type { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { WebhookRequiredHeaders } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import axios from "axios";
const webhookSecret: string = process.env.WEBHOOK_SECRET!;
export default async function handler(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse
) {
  const payload = JSON.stringify(req.body);
  const headers = req.headers;
  const wh = new Webhook(webhookSecret);
  let evt: WebhookEvent;
  try {
    evt = wh.verify(payload, headers) as WebhookEvent;
  } catch (_) {
    return res.status(400).json({});
  }
  const { id } = evt.data;
  const eventType = evt.type;
  if (eventType === "user.created") {
    const data = evt.data;
    const apiUrl = "https://objective-brown.cmd.outerbase.io/push-to-db";
    const obj = {
      id: data.id,
      created_at: String(data.created_at),
      email_address: data.email_addresses[0].email_address,
      image_url: data.image_url,
      last_name: data.last_name,
      profile_image_url: data.profile_image_url,
      first_name: data.first_name,
      username: data.username,
    };
    await axios.post(apiUrl, obj, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    await axios.post(
      "https://objective-brown.cmd.outerbase.io/register-username",
      {
        username: data.username,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res.status(201).json({});
  }
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};
