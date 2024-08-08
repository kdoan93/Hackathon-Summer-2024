import React from "react";
import Head from "next/head";
import NavBar from "../../app/components/NavBar/NavBar";

const Landing = () => {
  return (
    <div className="landing-page">
      <NavBar isLoggedIn={false} />
      <div className="container">
        <Head>
          <title>Welcome to Sustain</title>
        </Head>
        <main>
          <h1>Welcome to Sustain</h1>
          <p>Please log in or sign up to continue.</p>
          {/* Login and Sign Up Modals or Forms */}
        </main>
        <footer>
          <p className="copyright">© 2024 Sustain</p>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
