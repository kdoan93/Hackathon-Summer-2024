import { GetServerSideProps } from "next";
import Head from "next/head";
import client from "../lib/mongodb";
import InputForm from "../app/components/InputForm/InputForm";
import NavBar from "../app/components/NavBar/NavBar";
import "./global.css";

// Constants for MongoDB
const DB_NAME = "sample_mflix";
const COLLECTION_NAME = "users";

// Get data from MongoDB
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

// Home component
const Home = () => {
  return (
    <div className="main-page">
      <NavBar />
      <div className="container">
        {/* Metadata */}
        <Head>
          <title>Sustain | Nourish. Embrace. Overcome. </title>
          <link rel="icon" href="/images/sustainlogo-peach.png" />
        </Head>

        {/* Main content */}
        <main>
          <h1 className="title">Welcome to Sustain!</h1>
          <p className="description">
            Enter your meal and get nutrition facts!
          </p>
          <InputForm />
        </main>

        {/* Footer */}
        <footer>
          <p className="copyright">© 2024 Sustain</p>
        </footer>

        {/* TODO: Should we move this to a separate CSS file? */}
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
