"use client";
import React, { useState } from "react";
import FoodForm from "../components/FoodForm/FoodForm";
import Response from "../components/ResponseComponent/ResponseComponent";

const App: React.FC = () => {
  const [food, setFood] = useState<string>("");

  const handleFoodSubmit = (submittedFood: string) => {
    setFood(submittedFood);
  };

  return (
    <>
      <header>
        <h1>Gemini Testing Page</h1>
        <FoodForm onSubmit={handleFoodSubmit} />
        {food && <Response food={food} />}
      </header>
    </>
  );
};

export default App;
