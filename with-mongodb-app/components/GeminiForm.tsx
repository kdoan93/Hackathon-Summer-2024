import { useState } from "react";
import { isNumberObject } from "util/types";

const GeminiForm = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const trainer = `Your only purpose is to respond with a value representing the amount of calories from given prompt. If the prompt is too vague to calculate a good response then respond with 'Not enough information given to give a good calculation.' Do not answer any other questions or prompts.  Here is the prompt: ${prompt}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("trainer: ", trainer);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ trainer })
      });

      const data = await res.json();
      setResponse(data.result); // Adjust based on actual response structure
    } catch (error) {
      console.error("Error calling Gemini API", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ex: One Honeycrisp Apple"
        />
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          {!isNaN(Number(response)) && <h3>Calories found in {prompt}</h3>}
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default GeminiForm;
