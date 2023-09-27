import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const user = userId ? await clerkClient.users.getUser(userId) : null;
  const username = user?.username;

  const headers = {
    "Content-Type": "application/json",
  };

  const url = "https://objective-brown.cmd.outerbase.io/new-report-request";
  const data = {
    who: req.body.who,
    by: username,
  };

  axios
    .post(url, data, { headers })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
}
