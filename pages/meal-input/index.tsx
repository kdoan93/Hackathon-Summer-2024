import React, { useState } from "react";
import Head from "next/head";
import NavBar from "../../app/components/NavBar/NavBar";
import InputForm from "../../app/components/InputForm/InputForm";
import Footer from "../../app/components/Footer/Footer";
import FoodEntries from "../../app/components/FoodEntries/foodEntries";

const MealInput = () => {
  const [trigger, setTrigger] = useState(false);

  const handleEntryAdded = () => {
    setTrigger(!trigger); // Toggle the trigger to refresh FoodEntries
  };

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
            <InputForm onEntryAdded={handleEntryAdded} />
          </div>
          <div className="p-5 h-[70vh]">
            <h1 className="page-header">Recent Entries</h1>
            <FoodEntries trigger={trigger} setTrigger={setTrigger} />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MealInput;
