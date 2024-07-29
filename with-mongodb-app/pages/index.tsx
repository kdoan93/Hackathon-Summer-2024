import { GetServerSideProps } from "next";
import client from "../lib/mongodb";
import InputForm from "../app/components/InputForm/InputForm";
import NutritionTable from "../app/components/NutritionTable/NutritionTable";
import "./global.css";

const DB_NAME = "sample_mflix";
const COLLECTION_NAME = "users";

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
// import { GetServerSideProps } from 'next';
// import client from '../lib/mongodb';
import Head from "next/head";
import GeminiForm from "../components/GeminiForm";

// DON'T NEED DB STUFF YET
// const DB_NAME = 'sample_mflix';
// const COLLECTION_NAME = 'users';

// export const getServerSideProps: GetServerSideProps = async () => {
//   await client.connect();
//   const db = client.db(DB_NAME);
//   const data = await db.collection(COLLECTION_NAME).find({}).toArray();

//   return {
//     props: {
//       data: JSON.parse(JSON.stringify(data)),
//     },
//   };
// };

// const Home = ({ data }: { data: any[] }) => {
//   return (
//     <div>
//       <h1>Hello World</h1>
//       <h2>Data from MongoDB Atlas</h2>
//       <h3>Database name: {DB_NAME}</h3>
//       <h4>Collection name: {COLLECTION_NAME}</h4>
//       <ul>
//         {data.map((item) => (
//           <li key={item._id}>{item.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

const Home = () => {
  return (
    <div className="main-page">
      <main>
        <NutritionTable />
        <InputForm />
        {/* <div data-theme="corporate">
        <h1>Hello World</h1>
        <h2>Data from MongoDB Atlas</h2>
        <h3>Database name: {DB_NAME}</h3>
        <h4>Collection name: {COLLECTION_NAME}</h4>
        <ul>
        {data.map((item) => (
          <li key={item._id}>{item.name}</li>
          ))}
          </ul>
          </div> */}
      </main>
      <div className="container">
        <Head>
          <title>Sustain | Nourish. Embrace. Overcome. </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1 className="title">Welcome to Sustain!</h1>
          <p className="description">
            What did you eat? Please be as specific as possible.
          </p>
          <GeminiForm />
        </main>

        <footer>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
          </a>
        </footer>

        <style jsx>{`
          .container {
            min-height: 100vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          main {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          footer img {
            margin-left: 0.5rem;
          }

          footer a {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          .title a {
            color: #0070f3;
            text-decoration: none;
          }

          .title a:hover,
          .title a:focus,
          .title a:active {
            text-decoration: underline;
          }

          .title {
            margin: 0;
            line-height: 1.15;
            font-size: 4rem;
          }

          .title,
          .description {
            text-align: center;
          }

          .description {
            line-height: 1.5;
            font-size: 1.5rem;
          }

          code {
            background: #fafafa;
            border-radius: 5px;
            padding: 0.75rem;
            font-size: 1.1rem;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
              DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Home;
