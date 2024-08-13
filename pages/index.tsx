import React, { useState, useEffect } from "react";
import Head from "next/head";
import NavBar from "../app/components/NavBar/NavBar";
// import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { SignInButton, useUser } from "@clerk/nextjs";
import InputForm from "../app/components/InputForm/InputForm";
import Footer from "../app/components/Footer/Footer";
import "./global.css";

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

// Home component
const Home: React.FC<HomeProps> = ({ data }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const logoWord = "Sustain";
  const [typeWriterText, setTypeWriterText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);

  // Clerk Auth0
  const { isLoaded, isSignedIn, user } = useUser();

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
          <div className=" flex flex-row gap-2 items-center welcome-container">
            <h1 className="title">Welcome to </h1>
            <h1 className="title-effect title text-logo-orange">
              {typeWriterText}
            </h1>
          </div>

          <InputForm />
          {!isSignedIn && (
            <p className="description mt-4">
              Unlock your health journey -{" "}
              <button className="landingSignIn">
                <SignInButton>Sign in</SignInButton>
              </button>{" "}
              to get started.{" "}
            </p>
          )}
        </main>

        {/* Footer */}
        <Footer />

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

          .title {
            margin: 0;
            line-height: 1.15;
            font-size: 4rem;
          }

          .title {
            text-align: center;
          }
          @media (max-width: 768px) {
            .welcome-container {
              flex-direction: column;
              text-align: center;
          }
          @media (min-width: 1200px) {
            .title {
              font-size: 6rem; /* Larger screens */
            }
          }
        `}</style>
      </div>
    </div>
  );
};

// export default withPageAuthRequired(Home);
export default Home;
