import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import FoodForm from "../FoodForm/FoodForm";

const GeminiComponent: React.FC = () => {
  const [calorieResults, setcalorieResults] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generatecalorieResults = async (food: string) => {
    setLoading(true);
    setError(null);
    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Return the total amount of calories in ${food}.`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = await response.text();
      setcalorieResults(text);
    } catch (err) {
      setError("Failed to generate calorie results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <FoodForm onSubmit={generatecalorieResults} />
      {loading && <p>Gathering Results...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {calorieResults && (
        <div>
          <h2>Results: </h2>
          <p>{calorieResults}</p>
        </div>
      )}
    </div>
  );
};

export default GeminiComponent;
