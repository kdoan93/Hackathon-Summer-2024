import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";

interface ProfileFormValues {
  userId: string;
  heightInch: number;
  weightLbs: number;
  goalWeight: number;
  age: number;
  activityLevel: number;
  bmi: number;
  bmiCategory: string;
}

interface ProfileFormProps {
  onProfileCreated: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onProfileCreated }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [heightFeet, setHeightFeet] = useState<number | "">(0);
  const [heightInches, setHeightInches] = useState<number | "">(0);
  const [weightLbs, setWeightLbs] = useState<number | "">(0);
  const [goalWeight, setGoalWeight] = useState<number | "">(0);
  const [age, setAge] = useState<number | "">(0);
  const [activityLevel, setActivityLevel] = useState<number>(3);
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string | null>(null);
  const { user } = useUser();
  const userId = user?.id;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivityLevel(parseInt(e.target.value));
  };

  const calculateBMI = (height: number, weight: number): number => {
    return 703 * (weight / (height * height));
  };

  const determineBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi < 24.9) return "Normal weight";
    if (bmi >= 25 && bmi < 29.9) return "Overweight";
    return "Obesity";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      setMessage("User is not authenticated. Please log in.");
      return;
    }

    if (
      typeof heightFeet === "number" &&
      typeof heightInches === "number" &&
      typeof weightLbs === "number" &&
      typeof goalWeight === "number"
    ) {
      const totalHeightInInches = heightFeet * 12 + heightInches;
      const calculatedBMI = calculateBMI(totalHeightInInches, weightLbs);
      const category = determineBMICategory(calculatedBMI);

      const BMIData: ProfileFormValues = {
        userId,
        heightInch: totalHeightInInches,
        weightLbs,
        goalWeight,
        age: typeof age === "number" ? age : 0,
        activityLevel,
        bmi: calculatedBMI,
        bmiCategory: category
      };

      try {
        const response = await fetch("/api/createProfile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(BMIData)
        });

        const data = await response.json();

        if (response.ok) {
          setMessage("Profile Created Successfully!");
          console.log("Profile created, triggering callback");
          onProfileCreated();
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        setMessage("An error occurred. Please try again.");
      }
    } else {
      setMessage("Please enter valid numbers for height and weight.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Form fields for height, weight, age, etc. */}
        <label className="input input-bordered flex items-start">
          Height:
          <div className="flex">
            <input
              className="w-20"
              type="number"
              value={heightFeet}
              onChange={(e) => setHeightFeet(parseInt(e.target.value))}
              placeholder="Feet"
              required
            />
            <span className="mx-2">ft</span>
            <input
              className="w-20"
              type="number"
              value={heightInches}
              onChange={(e) => setHeightInches(parseInt(e.target.value))}
              placeholder="Inches"
              required
            />
            <span className="mx-2">in</span>
          </div>
        </label>
        <label className="input input-bordered flex items-start">
          Weight (in lbs):
          <input
            className="w-64"
            type="number"
            value={weightLbs}
            onChange={(e) => setWeightLbs(parseFloat(e.target.value))}
            placeholder="Enter your weight"
            required
          />
        </label>
        <label className="input input-bordered flex items-start">
          Goal Weight (in lbs):
          <input
            className="w-64"
            type="number"
            value={goalWeight}
            onChange={(e) => setGoalWeight(parseFloat(e.target.value))}
            placeholder="Enter your weight"
            required
          />
        </label>
        <label className="input input-bordered flex items-start">
          Age:
          <input
            className="w-64"
            type="number"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
            placeholder="Enter your age"
            required
          />
        </label>
        <label>
          Activity Level:
          <input
            type="range"
            min={1}
            max="5"
            value={activityLevel}
            className="range"
            step="1"
            onChange={handleChange}
          />
          <div className="flex w-full justify-between px-2 text-xs">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </label>
        <label className="submit-bmi-container flex flex-col items-center">
          <button
            className="sumbit-bmi-profile text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            type="submit"
          >
            Submit
          </button>
        </label>
      </form>
      {message && <p>{message}</p>}
    </>
  );
};

export default ProfileForm;
