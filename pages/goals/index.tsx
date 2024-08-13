import React from "react";
import Head from "next/head";
import NavBar from "../../app/components/NavBar/NavBar";
import Footer from "../../app/components/Footer/Footer";

const Goals = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <div className="goals-page">
      <NavBar isLoggedIn={isLoggedIn} />
      <div className="container">
        <Head>
          <title>Goals | Sustain</title>
        </Head>
        <main className="main-container">
          <h1 className="page-header">Goals</h1>
          {/* Goals content here */}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Goals;
