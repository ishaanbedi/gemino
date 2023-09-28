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
  const url = "https://objective-brown.cmd.outerbase.io/get-user-rank";
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await axios.get(url, { headers });
  var userResp = response.data.response.items;
  userResp.sort(
    (a: { overall_points: number }, b: { overall_points: number }) => {
      return a.overall_points - b.overall_points;
    }
  );
  userResp = userResp.filter(
    (user: { overall_points: number }) => user.overall_points !== 0
  );
  return res.status(200).json(
    userResp.map((user: any, index: number) => {
      return {
        rank: userResp.length - index,
        username: user.username,
        points: user.overall_points,
      };
    })
  );
}
