"use client";
import React, { useState } from "react";
import Badge from "../Badge/Badge";
import VoiceToText from "../VoiceToText/VoiceToText"; // Import the VoiceToText component

const InputForm: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const trainer = `Your only purpose is to respond with a value representing the amount of calories from given prompt. If the prompt is too vague to calculate a good response then respond with 'Not enough information given to give a good calculation.' Do not answer any other questions or prompts. Here is the prompt: ${prompt}`;

  const dataToolTip =
    "Enter your meal or use voice-to-text for a calorie count! For accuracy, include serving size, ingredients, and preparation method (e.g., fried or boiled).";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("trainer: ", trainer);
    console.log("response", response, "I am prompt", prompt);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ trainer })
      });
      const data = await response.json();
      setResponse(data.result);
    } catch (error) {
      console.error("Error calling Gemini API", error);
    }
  };

  return (
    <div>
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

      {/* Gemini API Response */}
      <Badge response={response} prompt={prompt} />
    </div>
  );
};

export default InputForm;
