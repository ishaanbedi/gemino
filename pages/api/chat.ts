import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
export const runtime = "edge";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(req: Request, res: Response) {
  const { messages } = await req.json();
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k-0613",
    // model: "text-ada-001",
    stream: true,
    messages: messages,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
