import React from "react";
import Head from "next/head";
import NavBar from "../../app/components/NavBar/NavBar";
import AboutUs from "../../app/components/AboutUs/AboutUs";
import Footer from "../../app/components/Footer/Footer";

const About = () => {
  return (
    <div className="about-page pt-5">
      <NavBar />
      <div className="container">
        <Head>
          <title>About | Sustain</title>
        </Head>
        <main className="main-container">
          <h1 className="page-header">About Sustain</h1>
          <AboutUs />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default About;
