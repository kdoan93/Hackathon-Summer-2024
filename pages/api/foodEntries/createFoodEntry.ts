import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

interface ResType {
  success: boolean;
  data?: any;
  message?: string;
}

async function createFoodEntry(req: NextApiRequest, res: NextApiResponse<ResType>) {
  if (req.method === "POST") {
    try {
      const { userId, prompt, AIresponse } = req.body;

      const client = await clientPromise;
      const db = client.db("mydatabase");
      const collection = db.collection("foodEntries");

      const document = {
        userId,
        prompt,
        response: AIresponse,
        createdAt: new Date()
      };

      const result = await collection.insertOne(document);

      res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}

export default createFoodEntry;
