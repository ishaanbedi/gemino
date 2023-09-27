// https://objective-brown.cmd.outerbase.io/get-level-data?level=${level}
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
  const headers = {
    "Content-Type": "application/json",
  };
  const { level } = req.query;
  const resp = await axios.get(
    `https://objective-brown.cmd.outerbase.io/get-level-data`,
    {
      headers: headers,
    }
  );
  const data = resp.data;
  for (let i of data.response.items) {
    if (i.level == level) {
      return res.status(200).json({
        data: i,
      });
    }
  }
  res.status(200).json({
    data: null,
  });
}
