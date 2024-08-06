import type { NextApiRequest, NextApiResponse } from 'next';
import { Document, WithId } from 'mongodb';
import clientPromise from '../../lib/mongodb';

interface MongoData extends Document {
  name: string;
  email: string;
}

type Data = {
  name: string;
  email: string;
};

// Define a union type for the response
type ResponseData = Data[] | { message: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    const client = await clientPromise;
    const db = client.db('sample_mflix');

    // Specify the expected type using generics
    const data: WithId<MongoData>[] = await db.collection<MongoData>('users').find({}).toArray();

    // Map the MongoDB documents to the Data type
    const result: Data[] = data.map(doc => ({
      name: doc.name,
      email: doc.email,
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
