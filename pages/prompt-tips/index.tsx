import React from "react";
import Head from "next/head";
import NavBar from "../../app/components/NavBar/NavBar";
import Footer from "../../app/components/Footer/Footer";

const PromptTips = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <div className="prompt-tips-page">
      <NavBar isLoggedIn={isLoggedIn} />
      <div className="container">
        <Head>
          <title>Prompt Tips | Sustain</title>
        </Head>
        <main className="main-container">
          <h1 className="page-header">Prompt Tips</h1>
          {/* Prompt Tips content here */}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default PromptTips;
