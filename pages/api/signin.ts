import { NextApiRequest, NextApiResponse } from "next";
import { Document } from "mongodb";
import clientPromise from "../../lib/mongodb";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

interface MongoData extends Document {
    username: string;
    password: string;
}

type Data = {
    message: string;
    token?: string;
}

type ResponseData = Data | { message: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ message: "Missing password" })
            return;
        }

        try {
            const client = await clientPromise
            const db = client.db('mydatabase')

            const user = await db.collection<MongoData>('users').findOne({ username })
            if (!user) {
                res.status(401).json({ message: "Invalid username or password" })
                return
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                res.status(401).json({ message: 'Invalid password' })
                return
            }

            const token = jwt.sign({ user: username }, process.env.JWT_SECRET!, {
                expiresIn: '24h',
            });

            res.status(200).json({ message: 'Signed in successfully', token });

        } catch (error) {
            res.status(500).json({ message: (error as Error).message })

        }

    } else {
        res.setHeader( 'Allow', ['POST'] )
        res.status(405).json({ message: `Method ${req.method} not allowed` })

    }
}
