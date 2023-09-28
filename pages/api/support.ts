import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";
import axios from "axios";
import { Resend } from "resend";
import SupportEmailTemplate from "@/components/email-template";
import SupportRequestAdmin from "@/components/admin-email-template";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);
  const resend = new Resend(process.env.RESEND_API_KEY);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const user = userId ? await clerkClient.users.getUser(userId) : null;
  const username = user?.username;
  const { email, question, topic } = req.body;
  const apiUrl = `https://objective-brown.cmd.outerbase.io/new-support-request`;

  const requestData = {
    question: question,
    username: username,
    email: email,
    topic: topic,
  };

  axios
    .post(apiUrl, requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(async (response) => {
      try {
        const data = await resend.emails.send({
          from: "Ishaan <support_gemino@ishaanbedi.in>",
          to: requestData.email,
          subject: `Support request received!`,
          react: SupportEmailTemplate({
            user: { username: requestData.username, email: requestData.email },
            question: requestData.question,
            selectedTopic: requestData.topic,
          }),
        });

        res.status(200).json(data);
      } catch (error) {
        res.status(400).json(error);
      }
      try {
        const data = await resend.emails.send({
          from: "Support System <support_system_gemino@ishaanbedi.in>",
          to: `hi@ishaanbedi.in`,
          subject: `New support request from @${requestData.username}`,
          react: SupportRequestAdmin({
            user: { username: requestData.username, email: requestData.email },
            question: requestData.question,
            selectedTopic: requestData.topic,
          }),
        });

        res.status(200).json(data);
      } catch (error) {
        res.status(400).json(error);
      }
      res.status(201).json({
        success: true,
        message: "Support request submitted successfully",
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({
        success: false,
        message: "Error submitting support request",
      });
    });
}
