import React from "react";
import Head from "next/head";
import NavBar from "../../app/components/NavBar/NavBar";
import InputForm from "../../app/components/InputForm/InputForm";
import Footer from "../../app/components/Footer/Footer";
import FoodEntries from "../../app/components/FoodEntries/foodEntries";

const MealInput = () => {
  return (
    <div className="meal-input-page">
      <NavBar />
      <div className="container">
        <Head>
          <title>Meal Input | Sustain</title>
          <link rel="icon" href="/images/sustainlogo-peach.png" />
        </Head>
        <main className="main-container">
          <h1 className="page-header">Meal Input</h1>
          <div className="w-[50vw] h-120 border rounded-2xl border-logo-orange p-5">
            <InputForm />
          </div>
          <div className="p-5 h-[70vh]">
            <h1 className="page-header">Recent Entries</h1>
            <FoodEntries />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MealInput;
