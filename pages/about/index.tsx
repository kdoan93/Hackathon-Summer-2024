import React from "react";
import Head from "next/head";
import NavBar from "../../app/components/NavBar/NavBar";

const About = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <div className="about-page">
      <NavBar isLoggedIn={isLoggedIn} />
      <div className="container">
        <Head>
          <title>About | Sustain</title>
        </Head>
        <main>
          <h1>About</h1>
          {/* About content here */}
        </main>
        <footer>
          <p className="copyright">© 2024 Sustain</p>
        </footer>
      </div>
    </div>
  );
};

export default About;
