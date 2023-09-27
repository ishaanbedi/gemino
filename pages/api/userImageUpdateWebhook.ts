import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const headers = {
    "Content-Type": "application/json",
  };
  const image_url = req.body.data.image_url;
  const email = req.body.data.email_addresses[0].email_address;
  await axios.get(
    `https://objective-brown.cmd.outerbase.io/update-profile-image?email_address=${email}&image_url=${image_url}`,
    { headers }
  );
  res.status(200).json({ image_url });
}
