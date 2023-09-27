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
  const url = "https://objective-brown.cmd.outerbase.io/get-stats-username";
  const headers = {
    "Content-Type": "application/json",
  };
  const data = {
    username: username,
  };
  const getCurrentTag = (level: number) => {
    switch (level) {
      case 1 - 10:
        return "Explorer";
      case 11 - 20:
        return "Samurai";
      case 21 - 30:
        return "Ninja";
      case 31 - 40:
        return "Sensei";
      case 41 - 50:
        return "Master";
      case 51 - 60:
        return "Legend";
      case 61 - 70:
        return "Immortal";
      case 71 - 80:
        return "God";
      case 81 - 90:
        return "Titan";
      case 91 - 100:
        return "Living Legend";
      default:
        return "Explorer";
    }
  };

  const makeRequest = (retryCount: number) => {
    axios
      .post(url, data, { headers })
      .then((response) => {
        res.status(200).json({
          overallPoints: String(response.data.response.items[0].overall_points),
          streak: String(response.data.response.items[0].streak),
          currentLevel: String(response.data.response.items[0].current_level),
          tag: getCurrentTag(response.data.response.items[0].current_level),
        });
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
