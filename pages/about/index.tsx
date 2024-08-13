import React from "react";
import Head from "next/head";
import NavBar from "../../app/components/NavBar/NavBar";
import AboutUs from "../../app/components/AboutUs/AboutUs";

const About = () => {
  return (
    <div className="about-page pt-5">
      <NavBar />
      <div className="container">
        <Head>
          <title>About | Sustain</title>
        </Head>
        <main className="main-container">
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
