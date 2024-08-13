import React from "react";
import Head from "next/head";
import NavBar from "../../app/components/NavBar/NavBar";
import InputForm from "../../app/components/InputForm/InputForm";
import Footer from "../../app/components/Footer/Footer";

const MealInput = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <div className="meal-input-page">
      <NavBar isLoggedIn={isLoggedIn} />
      <div className="container">
        <Head>
          <title>Meal Input | Sustain</title>
        </Head>
        <main className="main-container">
          <h1 className="page-header">Meal Input</h1>
          <InputForm />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MealInput;
