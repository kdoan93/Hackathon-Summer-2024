import React, { useState, useEffect } from "react";
import Head from "next/head";
import client from "../lib/mongodb";
import InputForm from "../app/components/InputForm/InputForm";
import LoginModal from "../app/components/Modals/LoginModal";
import SignupModal from "../app/components/Modals/SignupModal";
import NavBar from "../app/components/NavBar/NavBar";
import "./global.css";

// Constants for MongoDB
const DB_NAME = "sample_mflix";
const COLLECTION_NAME = "users";

// Get data from MongoDB
export const getServerSideProps = async () => {
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
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
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
    }
  }, [index]);

  return (
    <div className="main-page">
      <NavBar
        onLoginOpen={() => setIsLoginOpen(true)}
        onSignupOpen={() => setIsSignupOpen(true)}
      />
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
            <h1 className="title-effect title text-logo-orange">
              {typeWriterText}
            </h1>
          </div>
          <p className="description">
            Enter your meal and get nutrition facts!
          </p>
          <InputForm />
          {/* <div className="auth-buttons">
            <button onClick={() => setIsLoginOpen(true)}>Login</button>
            <button onClick={() => setIsSignupOpen(true)}>Sign Up</button>
          </div> */}
        </main>

        {/* Footer */}
        <footer>
          <p className="copyright">© 2024 Sustain</p>
        </footer>

        <LoginModal isOpen={isLoginOpen} onRequestClose={() => setIsLoginOpen(false)} />
        <SignupModal isOpen={isSignupOpen} onRequestClose={() => setIsSignupOpen(false)} />

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
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
          }

          .auth-buttons {
            margin-top: 2rem;
            display: flex;
            gap: 1rem;
          }

          .auth-buttons button {
            padding: 0.5rem 1rem;
            font-size: 1rem;
            color: #fff;
            background-color: #0070f3;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .auth-buttons button:hover {
            background-color: #005bb5;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Home;
