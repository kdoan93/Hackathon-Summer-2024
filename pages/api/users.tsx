import { NextApiRequest, NextApiResponse } from "next";
import { default as clientPromise } from "../../lib/mongodb";
import { Db, MongoClient } from "mongodb";

interface User {
  _id?: string;
  name: string;
}

async function handler( req: NextApiRequest, res: NextApiResponse) {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('your-database-name');
    const collection = db.collection<User>('users');

    if (req.method === 'GET') {
      // Fetch data
      const users = await collection.find({}).toArray();
      res.status(200).json(users);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// // Get data from MongoDB
// export const getServerSideProps = async () => {
//     await client.connect();

//     const db = client.db(DB_NAME);
//     if (!db) throw new Error("Missing MongoDB! -Kenny")

//     const data = await db.collection(COLLECTION_NAME).find({}).toArray();
//     if (!data) throw new Error("Error with data from MongoDB! -Kenny")

//   return {
//     props: {
//       data: JSON.parse(JSON.stringify(data)),
//     },
//   };
// };

