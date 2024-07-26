import React from "react";

const GeminiComponent = () => {
  const { GoogleGenerativeAI } = require("@google/generative-ai");

  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);

  // ...

  // The Gemini 1.5 models are versatile and work with most use cases
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // ...
  return (
    <>
      <form>
        
      </form>
    </>
  );
};

export default GeminiComponent;
