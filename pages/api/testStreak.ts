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
  var currentStreak = async () => {
    const url = `https://objective-brown.cmd.outerbase.io/get-current-streak?username=${username}`;
    const { data } = await axios.get(url);
    return {
      streak_number: data.response.items[0].streak,
      streak_date: data.response.items[0].streak_last_updated,
    };
  };

  var { streak_number, streak_date } = await currentStreak();

  if (streak_number === 0) {
    streak_number = 1;
    streak_date = new Date().toISOString();
  }

    var today = new Date(); 
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var date2 = new Date(date);
    var date3 = new Date(streak_date);
    var difference = date2.getTime() - date3.getTime();
    var days = Math.ceil(difference / (1000 * 3600 * 24));
    if (days > 1) {
      streak_number = 1;
      streak_date = new Date().toISOString();
    } else if (days === 1) {
      streak_number = streak_number + 1;
      streak_date = new Date().toISOString();
    } else {
      streak_number = streak_number;
      streak_date = streak_date;
    }



  res.status(200).json({
    streak_number: streak_number,
    streak_date: streak_date,
  });
}
