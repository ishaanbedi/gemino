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
  const { points, nextLevel, wordsUserMustReview, existingPoints } = req.body;
  if (!points || !nextLevel || !wordsUserMustReview) {
    return res.status(400).json({ error: "Missing fields" });
  }
  const getWords = async () => {
    const { data } = await axios.get(
      "https://objective-brown.cmd.outerbase.io/get-words-user-must-revise"
    );
    var array = data.response.items;
    var words: any[] = [];
    for (let i of array) {
      if (i.username === username) {
        if (i.words_user_must_revise === null) {
          return [];
        }
        words = i.words_user_must_revise.split(",");
      }
    }
    return words;
  };

  var words = await getWords();
  var newArray = [...wordsUserMustReview, ...words];
  var uniqueArray = newArray.filter(function (item, pos) {
    return newArray.indexOf(item) == pos;
  });
  var index = uniqueArray.indexOf("True");
  if (index > -1) {
    uniqueArray.splice(index, 1);
  }
  var index = uniqueArray.indexOf("False");
  if (index > -1) {
    uniqueArray.splice(index, 1);
  }
  var string = uniqueArray.toString();

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
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
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

  const url = "https://objective-brown.cmd.outerbase.io/update-user-progress";
  const data = {
    overall_points: String(parseInt(existingPoints) + parseInt(points)),
    username: String(username),
    current_level: String(nextLevel),
    streak: String(streak_number),
    words_user_must_revise: string,
    streak_last_updated: String(new Date().toISOString()),
  };

  await axios
    .patch(url, data, {
      headers: headers,
    })
    .then((response) => {
      res.json({ username: username, response: response.data });
    })
    .catch((error) => {
      res.json({ error: error });
    });
}
