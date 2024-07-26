"use client";
import React, { useState } from "react";

interface FoodFormProps {
  onSubmit: (food: string) => void;
}

const FoodForm: React.FC<FoodFormProps> = ({ onSubmit }) => {
  const [food, setFood] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(food);
    setFood("");
  };

  return (
    <>
      <h1>What did you eat? Please be as specific as possible</h1>
      <form onSubmit={handleSubmit} className="join">
        <input
          className="input input-bordered join-item"
          type="text"
          id="foodInput"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          placeholder="ex. One Honeycrisp Apple"
        />
        <button className="btn join-item rounded-r-full" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default FoodForm;
