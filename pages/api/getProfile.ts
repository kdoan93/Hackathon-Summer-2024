import type { NextApiRequest, NextApiResponse } from "next";
import { Document, WithId } from "mongodb";
import clientPromise from "../../lib/mongodb";

// Define the structure of the profile data stored in MongoDB
interface ProfileData extends Document {
  userId: string;
  heightInch: number;
  weightLbs: number;
  goalWeight: number;
  age: number;
  activityLevel: string;
  bmi: number;
  bmiCategory: string;
  createdAt: string;
}

// Define the structure of the profile data returned by the API
type Data = {
  userId: string;
  heightInch: number;
  weightLbs: number;
  goalWeight: number;
  age: number;
  activityLevel: string;
  bmi: number;
  bmiCategory: string;
  createdAt: string;
};

// Define a union type for the API response
type ResponseData = Data | { message: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === "GET") {
    try {
      const { userId } = req.query;

      if (!userId || typeof userId !== "string") {
        return res.status(400).json({ message: "Invalid or missing userId" });
      }

      const client = await clientPromise;
      const db = client.db("mydatabase");

      // Specify the expected type using generics
      const profile: WithId<ProfileData> | null = await db.collection<ProfileData>("profiles").findOne({ userId });

      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      // Map the MongoDB document to the Data type
      const result: Data = {
        userId: profile.userId,
        heightInch: profile.heightInch,
        weightLbs: profile.weightLbs,
        goalWeight: profile.goalWeight,
        age: profile.age,
        activityLevel: profile.activityLevel,
        bmi: profile.bmi,
        bmiCategory: profile.bmiCategory,
        createdAt: profile.createdAt
      };

      res.status(200).json(result);
    } catch (error) {
      console.error("Error retrieving profile data:", error);
      res.status(500).json({ message: (error as Error).message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
