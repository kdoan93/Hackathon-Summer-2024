import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

interface ResType {
  success: boolean;
  data?: any;
  message?: string;
}

async function getDashboardData(
  req: NextApiRequest,
  res: NextApiResponse<ResType>
) {
  if (req.method === "GET") {
    try {
      const { userId } = req.query;

      if (!userId || typeof userId !== "string") {
        return res
          .status(400)
          .json({ success: false, message: "Invalid or missing userId" });
      }

      const client = await clientPromise;
      const db = client.db("mydatabase");
      const collection = db.collection("dashboard");

      const data = await collection.find({ userId }).toArray();

      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("Error retrieving data:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}

export default getDashboardData;
