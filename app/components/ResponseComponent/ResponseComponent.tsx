import React from "react";

interface ResponseProps {
  food: string;
}

const Response: React.FC<ResponseProps> = ({ food }) => {
  return (
    <div className="response">
      <h2>User Input:</h2>
      <p>{food}</p>
    </div>
  );
};

export default Response;
