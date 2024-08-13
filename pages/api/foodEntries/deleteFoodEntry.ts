import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

interface ResType {
  success: boolean;
  message?: string;
}

async function deleteFoodEntry(req: NextApiRequest, res: NextApiResponse<ResType>) {
  if (req.method === "DELETE") {
    try {
      const { logId, userId } = req.query;

      if (!logId || typeof logId !== "string" || !userId || typeof userId !== "string") {
        return res.status(400).json({ success: false, message: "Invalid or missing log ID or user ID" });
      }

      const client = await clientPromise;
      const db = client.db("mydatabase");
      const collection = db.collection("foodEntries");

      // Ensure we are deleting the document for the correct user
      const result = await collection.deleteOne({ _id: new ObjectId(logId), userId });

      console.log("Delete result for logId:", logId);

      if (result.deletedCount === 1) {
        res.status(200).json({ success: true, message: "Document deleted successfully" });
      } else {
        res.status(404).json({ success: false, message: "Document not found" });
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}

export default deleteFoodEntry;
