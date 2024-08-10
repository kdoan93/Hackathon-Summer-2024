import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

interface ResType {
  success: boolean;
  data?: any;
  message?: string;
}

async function updateDashboardData( req: NextApiRequest, res: NextApiResponse<ResType> ) {
  if (req.method === "POST") {
    try {
      const { userId } = req.query;

      const { prompt, normalizedResponse } = req.body;

      if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ success: false, message: 'Invalid or missing user ID' })
      }

      const client = await clientPromise;
      const db = client.db("mydatabase");
      const collection = db.collection("dashboard");

      const document = {
        userId,
        prompt,
        response: normalizedResponse,
        createdAt: new Date(),
      };

    //   const result = await collection.findOneAndUpdate( userId, document );

    //   res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.error("Error saving data:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}

export default updateDashboardData;
