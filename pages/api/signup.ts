import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

type Data = {
    message: string;
    token?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "Missing required fields" })
            return;
        }

        try {
            const client = await clientPromise
            const db = client.db('mydatabase')

            const user = await db.collection('users').findOne({ email })
            if (!user) {
                res.status(401).json({ message: "Invalid email or password" })
                return
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                res.status(401).json({ message: 'Invalid password' })
                return
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
                expiresIn: '24h',
            })

            res.status(200).json({ message: 'Signed in successfully', token })
        } catch (error) {
            res.status(500).json({ message: (error as Error).message })
        }
    } else {
        res.setHeader( 'Allow', ['POST'] )
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
}
