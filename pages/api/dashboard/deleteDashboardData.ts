import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

interface ResType {
  success: boolean;
  data?: any;
  message?: string;
}

async function deleteDashboardData(
  req: NextApiRequest,
  res: NextApiResponse<ResType>
) {
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      console.log("ID received:", id); // Log the received ID

      if (!id || typeof id !== "string") {
        return res
          .status(400)
          .json({ success: false, message: "Invalid or missing id" });
      }

      // Convert the ID from string to ObjectId
      const objectId = new ObjectId(id);

      const client = await clientPromise;
      const db = client.db("mydatabase");
      const collection = db.collection("dashboard");

      // Attempt to delete the document by its _id
      const result = await collection.deleteOne({ _id: objectId });

      console.log("Delete result:", result); // Log the result of the deletion

      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No document found to delete" });
      }

      res
        .status(200)
        .json({ success: true, message: "Document deleted successfully" });
    } catch (error) {
      console.error("Error deleting data:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}

export default deleteDashboardData;
