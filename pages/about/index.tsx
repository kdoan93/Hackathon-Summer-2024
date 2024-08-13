import React from "react";
import Head from "next/head";
import NavBar from "../../app/components/NavBar/NavBar";
import AboutUs from "../../app/components/AboutUs/AboutUs";

const About = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <div className="about-page">
      <NavBar isLoggedIn={isLoggedIn} />
      <div className="container">
        <Head>
          <title>About | Sustain</title>
        </Head>
        <main className="main-container">
          <h1 className="page-header">About Sustain</h1>
          <AboutUs />
        </main>
        <footer>
          <p className="copyright">© 2024 Sustain</p>
        </footer>
      </div>
    </div>
  );
};

export default About;
