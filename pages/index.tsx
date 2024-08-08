import React, { useState, useEffect } from "react";
import Head from "next/head";
import client from "../lib/mongodb";
import InputForm from "../app/components/InputForm/InputForm";
import NavBar from "../app/components/NavBar/NavBar";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import "./global.css";

// Constants for MongoDB
const DB_NAME = "sample_mflix";
const COLLECTION_NAME = "users";

// Interface for User data
interface User {
  _id: string;
  name: string;
  email: string;
}

// Props interface for Home component
interface HomeProps {
  data: User[];
}

// Get data from MongoDB
export const getServerSideProps = async () => {
  await client.connect();
  const db = client.db(DB_NAME);
  const data = await db.collection(COLLECTION_NAME).find({}).toArray();

  return {
    props: {
      data: JSON.parse(JSON.stringify(data))
    }
  };
};

// Home component
const Home: React.FC<HomeProps> = ({ data }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const logoWord = "Sustain";
  const [typeWriterText, setTypeWriterText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    // This initiates the type writer effect for the Sustain <h1> tag
    if (index < logoWord.length) {
      let timer = setTimeout(() => {
        setTypeWriterText((prev) => prev + logoWord[index]);
        setIndex((prev) => (prev += 1));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <div className="main-page">
      <NavBar isLoggedIn={true} />
      <div className="container">
        {/* Metadata */}
        <Head>
          <title>Sustain | Nourish. Embrace. Overcome. </title>
          <link rel="icon" href="/images/sustainlogo-peach.png" />
        </Head>

        {/* Main content */}
        <main>
          <div className=" flex flex-row gap-2">
            <h1 className="title">Welcome to </h1>
            <h1 className="title-effect title text-logo-orange">{typeWriterText}</h1>
          </div>
        </main>

        {/* Footer */}
        <footer>
          <p className="copyright">© 2024 Sustain</p>
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
        `}</style>
      </div>
    </div>
  );
};

export default withPageAuthRequired(Home);
