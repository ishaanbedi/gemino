import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const username = req.query.username as string;
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const resp = await axios.get(
      `https://objective-brown.cmd.outerbase.io/get-user-profile?username=${username}`,
      { headers }
    );
    const data = resp.data.response.items[0];
    if (data === undefined) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
