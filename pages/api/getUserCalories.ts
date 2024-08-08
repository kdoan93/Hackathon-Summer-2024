import type { NextApiRequest, NextApiResponse } from 'next';
import { Document, ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb';

interface MongoData extends Document {
    userId: string;
    calories: string;
}

type Data = {
    calories: string;
};

// Define a union type for the response
type ResponseData = Data[] | { message: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== 'GET') return res.status(405).json({ message: "Method not allowed" })

    const { userId } = req.query

    if (!userId || typeof userId !== 'string') return res.status(400).json({ message: 'Missing or invalid user id!'})

    try {
        const client = await clientPromise;
        const db = client.db('mydatabase');

        // Specify the expected type using generics
        const data = await db.collection<MongoData>('userNutrition').find({ userId }).toArray();

        console.log('Query Result:', data);

        // Map the MongoDB documents to the Data type
        const result: Data[] = data.map(doc => ({
            calories: doc.calories,
        }));

        console.log("In const result: ", result)

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}
