"use client";
import React, { useState } from "react";
import Badge from "../Badge/Badge";
import "./InputForm.css";
import VoiceToText from "../VoiceToText/VoiceToText"; // Import the VoiceToText component
import NutritionTable from "../NutritionTable/NutritionTable"; // Import the NutritionTable component

const InputForm: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [responseTitle, setResponseTitle] = useState<any>("");

  const trainer = `Your only job is to return nutritional values for the given food/food items. If the prompt is too vague to calculate a good response then respond with 'Not enough information given to give a good calculation.' Do not answer any other irrelevant questions or prompts. Dont forget to calculate for the amount of items given. if no amount is given assume it is one serving.

  Please provide an example object structure for response that includes the following nutritional values in this structure:

  result: {
    "Calories": *value*,
    "Total fat": *value*,
    "Cholesterol": *value*,
    "Sodium": *value*,
    "Total Carbohydrate": *value*,
    "Protein": *value*
    }

    Here is the food: ${prompt}`;

  const dataToolTip =
    "Enter your meal or use voice-to-text for a calorie count! For accuracy, include serving size, ingredients, and preparation method (e.g., fried or boiled).";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ trainer })
      });
      const data = await response.json();
      console.log("data: ", data);

      if (data.result.trim() === "Not enough information given to give a good calculation.") {
        setResponse(data.result);
        setIsValid(false);
        setSubmitted(true);
        setPrompt("");
        return;
      }

      const normalizedResponse = JSON.parse(data.result.replace(/```json|```/g, ""));
      console.log("normalizedResponse: ", normalizedResponse);
      setResponse(normalizedResponse);
      setSubmitted(true);
      setIsValid(true);
      setResponseTitle(prompt);
      setPrompt("");
    } catch (error) {
      console.error("Error calling Gemini API", error);
    }
  };

  return (
    <div>
      <p className="description">Enter your meal and get nutrition facts!</p>
      {/* Tooltip */}
      <div className="tooltip flex justify-end mb-1.5" data-tip={dataToolTip}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24" className="end mr-3">
          <path
            fill="currentColor"
            d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
          />
        </svg>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit}>
        <label className="input input-bordered flex items-center justify-between gap-2">
          <input
            className="w-64"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your meal..."
          />

          {/* Magnifying glass icon */}
          <div className="flex row">
            <button type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-80"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* VoiceToText Component */}
            <VoiceToText onTranscript={setPrompt} />
          </div>
        </label>
      </form>

      {/* Display the nutritional table if response is available */}
      {submitted && isValid ? (
        <div className="response-container">
          <h1 className="response-title mt-5 text-center text-2xl">{responseTitle}</h1>
          <NutritionTable response={response} />
          <div className="add-container flex flex-col items-center">
            <button className="add-to-meals text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              Add
            </button>
          </div>
        </div>
      ) : (
        submitted && !isValid && <p>{response}</p>
      )}
    </div>
  );
};

export default InputForm;
