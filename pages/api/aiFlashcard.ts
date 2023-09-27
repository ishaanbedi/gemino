import { NextApiRequest as Request, NextApiResponse as Response } from "next";

import { OpenAI } from "openai";

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

export default async function handler(req: Request, res: Response) {
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
  res
    .status(200)
    .json(
      JSON.parse(response.choices[0].message.function_call?.arguments as string)
    );
}
