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
  const url = "https://objective-brown.cmd.outerbase.io/get-user-rank";
  const headers = {
    "Content-Type": "application/json",
  };
  const data = {
    username: username,
  };

  const makeRequest = (retryCount: number) => {
    axios
      .get(url, { headers, data })
      .then((response) => {
        var userResp = response.data.response.items;
        userResp.sort(
          (a: { overall_points: number }, b: { overall_points: number }) => {
            return a.overall_points - b.overall_points;
          }
        );
        var rankOfUser = 0;
        for (var i = 0; i < userResp.length; i++) {
          if (userResp[i].username == username) {
            rankOfUser = i + 1;
          }
        }
        var pointsOfUser = userResp[rankOfUser - 1].overall_points;
        rankOfUser = userResp.length - rankOfUser + 1;
        return res
          .status(200)
          .json({ rank: rankOfUser, overall_points: pointsOfUser });
      })
      .catch((error) => {
        console.error(error);
        if (retryCount > 0) {
          setTimeout(() => {
            makeRequest(retryCount - 1);
          }, 2500);
        } else {
          res.status(500).json({ error: "Internal Server Error" });
        }
      });
  };
  makeRequest(2);
}
