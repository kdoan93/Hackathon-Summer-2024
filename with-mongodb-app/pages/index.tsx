import { GetServerSideProps } from 'next';
import client from '../lib/mongodb';

const DB_NAME = 'sample_mflix';
const COLLECTION_NAME = 'users';

export const getServerSideProps: GetServerSideProps = async () => {
  await client.connect();
  const db = client.db(DB_NAME);
  const data = await db.collection(COLLECTION_NAME).find({}).toArray();

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
  };
};

const Home = ({ data }: { data: any[] }) => {
  return (
    <div>
      <h1>Hello World</h1>
      <h2>Data from MongoDB Atlas</h2>
      <h3>Database name: {DB_NAME}</h3>
      <h4>Collection name: {COLLECTION_NAME}</h4>
      <ul>
        {data.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
