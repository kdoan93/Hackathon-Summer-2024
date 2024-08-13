import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { startOfWeek, endOfWeek } from "date-fns";

interface ResType {
  success: boolean;
  data?: any;
  message?: string;
}

async function getWeeklyCalories(req: NextApiRequest, res: NextApiResponse<ResType>) {
  if (req.method === "GET") {
    try {
      const { userId } = req.query;

      if (!userId || typeof userId !== "string") {
        return res.status(400).json({ success: false, message: "Invalid or missing userId" });
      }

      const client = await clientPromise;
      const db = client.db("mydatabase");
      const collection = db.collection("foodEntries");

      // Below sets a start date and end date of the current week to query the DB fo a sum
      const now = new Date();
      const startDate = startOfWeek(now);
      const endDate = endOfWeek(now);

      const result = await collection
        .aggregate([
          {
            $match: {
              userId,
              createdAt: { $gte: startDate, $lt: endDate }
            }
          },
          {
            $group: {
              _id: null,
              totalCalories: { $sum: "$response.Calories" }
            }
          }
        ])
        .toArray();

      const totalCalories = result.length > 0 ? result[0].totalCalories : 0;

      res.status(200).json({ success: true, data: { totalCalories } });
    } catch (error) {
      console.error("Error retrieving weekly calories:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}

export default getWeeklyCalories;
