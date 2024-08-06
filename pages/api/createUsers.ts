import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import bcrypt from 'bcryptjs';

type Data = {
  message: string;
};

interface User {
  username: string;
  email: string;
  password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    try {
      const client = await clientPromise;
      const db = client.db('mydatabase');

      // Check if the user already exists
      const existingUser = await db.collection('users').findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: 'User already exists' });
        return;
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser: User = {
        username,
        email,
        password: hashedPassword,
      };

      await db.collection('users').insertOne(newUser);

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
