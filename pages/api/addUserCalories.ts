import { Document } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

interface MongoData extends Document {
    userId: string;
    calories: string;
    date: string;
}

type Data = {
    userId: string;
    calories: string;
    date: string;
}

type ResponseData = Data[] | { message: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== 'POST') return res.status(405).json({ message: "Method not allowed" })

    const { userId, calories, date } = req.body

    if (!calories) return res.status(400).json({ message: "Log is missing calories!" })
    if (!date) return res.status(400).json({ message: "Log is missing date!" })
    if (!userId || typeof userId !== 'string') return res.status(400).json({ message: 'Log is missing or invalid user id!' })

    try {
        const client = await clientPromise
        const db = client.db('mydatabase')
        const data = await db.collection<MongoData>('userNutrition').insertOne({ userId, calories, date })

        // const newLog: Data = {
        //     userId,
        //     calories,
        //     date
        // }

        // await db.collection('userNutrition').insertOne(newLog)
        res.status(201).json({ message: 'Logged nutrition successfully' })

    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }

}
