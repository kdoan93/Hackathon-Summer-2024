import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the GoogleGenerativeAI client with the API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY as string);

const geminiModel = "gemini-1.5-flash";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { trainer } = req.body;

    try {
      const model = genAI.getGenerativeModel({ model: geminiModel });

      const result = await model.generateContent(trainer);
      const responseText = result.response.text();

      res.status(200).json({ result: responseText });
    } catch (error: any) {
      console.error("Error calling Gemini API", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
