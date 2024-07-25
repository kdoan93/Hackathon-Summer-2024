import { GetServerSideProps } from 'next';
import client from '../lib/mongodb';
import { Send } from 'lucide-react';

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

      {RenderForm()}
      {RenderMessages()}

      {/* <h1>Gemini!</h1>

      <h1>Hello World</h1>
      <h2>Data from MongoDB Atlas</h2>
      <h3>Database name: {DB_NAME}</h3>
      <h4>Collection name: {COLLECTION_NAME}</h4>
      <ul>
        {data.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default Home;

function RenderForm() {
  return <form action="" className='w-full flex flex-row gap-2 items-center h-full'>
    <input type='text' placeholder='Input your food here'
      className='border-b border-dashed outline-none w-full px-4 py-2 text-[#0842A0] placeholder:text-[#0842A099]'/>
    <button type='submit' className='rounded-full shadow-md border flex flex-row'>
      <Send className='p-3 h-10 w-10 stroke-stone-500' />
    </button>
  </form>
}

function RenderMessages() {
  return <div>Render Messages div</div>
}
