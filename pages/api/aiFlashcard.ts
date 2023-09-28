import { getAuth } from "@clerk/nextjs/server";
import { OpenAI } from "openai";
export const config = {
  runtime: "edge",
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const schema = {
  type: "object",
  properties: {
    response: {
      type: "array",
      description: "A list of words in German",
      items: {
        type: "object",
        properties: {
          word: {
            type: "string",
            description: "The word in German",
          },
          meaning: {
            type: "string",
            description: "The meaning of the word in English",
          },
          exampleInGerman: {
            type: "string",
            description: "An example sentence using the word in German",
          },
          translation: {
            type: "string",
            description: "The translation of the example sentence in English",
          },
        },
      },
    },
  },
  required: ["response"],
};

export default async function handler(req: any, res: any) {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0613",
    messages: [
      { role: "system", content: "You are a German flashcard expert." },
      {
        role: "user",
        content: `Give me exact 10 flashcards based around the words: ${req.body.words}}. If less than 10 words, add similar words. All the words should be different.`,
      },
    ],
    functions: [{ name: "getFlashCardJson", parameters: schema }],
    function_call: { name: "getFlashCardJson" },
    temperature: 0,
  });
  return new Response(response.choices[0].message.function_call?.arguments);
}
