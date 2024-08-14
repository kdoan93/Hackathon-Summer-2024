import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";

const activityMultipliers: { [key in 1 | 2 | 3 | 4 | 5]: number } = {
  1: 1.2,
  2: 1.375,
  3: 1.55,
  4: 1.725,
  5: 1.9
};

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
  const [gender, setGender] = useState<string | null>(null);
  const [activityLevel, setActivityLevel] = useState<1 | 2 | 3 | 4 | 5>(3);
  const { user } = useUser();
  const userId = user?.id;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sliderValue = parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5;
    setActivityLevel(sliderValue);
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

    if (
      typeof heightFeet === "number" &&
      typeof heightInches === "number" &&
      typeof weightLbs === "number" &&
      typeof goalWeight === "number"
    ) {
      const totalHeightInInches = heightFeet * 12 + heightInches;
      const calculatedBMI = calculateBMI(totalHeightInInches, weightLbs);
      const category = determineBMICategory(calculatedBMI);

      // Convert height to cm and weight to kg
      const heightCm = totalHeightInInches * 2.54;
      const weightKg = weightLbs / 2.205;
      const goalWeightKg = goalWeight / 2.205;

      // Calculate BMR
      let BMR: number;
      if (gender === "Male") {
        BMR = 10 * weightKg + 6.25 * heightCm - 5 * Number(age) + 5;
      } else {
        BMR = 10 * weightKg + 6.25 * heightCm - 5 * Number(age) - 161;
      }

      // Apply the correct activity multiplier
      const TDEE = BMR * activityMultipliers[activityLevel];

      let dailyCaloricIntake: number;
      if (goalWeightKg < weightKg) {
        dailyCaloricIntake = TDEE - 500;
      } else if (goalWeightKg > weightKg) {
        dailyCaloricIntake = TDEE + 500;
      } else {
        dailyCaloricIntake = TDEE;
      }

      const dailyProtein = (weightKg * 1.2).toFixed(2);
      const dailyFat = ((dailyCaloricIntake * 0.25) / 9).toFixed(2);
      const dailyCarbs = ((dailyCaloricIntake - parseFloat(dailyProtein) * 4 - parseFloat(dailyFat) * 9) / 4).toFixed(
        2
      );
      const dailyCholesterol = 300;
      const dailySodium = 2300;

      const BMIData = {
        userId,
        heightInch: totalHeightInInches,
        weightLbs,
        goalWeight,
        age: typeof age === "number" ? age : 0,
        gender,
        activityLevel,
        bmi: calculatedBMI,
        bmiCategory: category,
        dailyCaloricIntake: parseFloat(dailyCaloricIntake.toFixed(2)),
        dailyFat: parseFloat(dailyFat),
        dailyCholesterol,
        dailySodium,
        dailyCarbs: parseFloat(dailyCarbs),
        dailyProtein: parseFloat(dailyProtein)
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
    <div className="bg-mustard-yellow p-2 rounded-2xl w-80">
      <h1 className="flex flex-col items-center text-3xl text-dark-brown p-5">Create Your Profile</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <label className="input input-bordered flex items-center justify-between">
          Height:
          <div className="flex items-center justify-between w-36">
            <div className="bg-mustard-yellow flex items-center justify-between">
              <input
                className="w-12 pl-2 text-xl text-black"
                type="number"
                value={heightFeet}
                onChange={(e) => setHeightFeet(parseInt(e.target.value))}
                placeholder="Feet"
                required
              />
              <span className="text-xl bg-comp-black w-8 px-2">ft</span>
            </div>
            <div className="bg-mustard-yellow flex items-center justify-between">
              <input
                className="w-12 pl-2 text-xl text-black"
                type="number"
                value={heightInches}
                onChange={(e) => setHeightInches(parseInt(e.target.value))}
                placeholder="Inches"
                required
              />
              <span className="text-xl bg-comp-black w-8 px-2">in</span>
            </div>
          </div>
        </label>
        <label className="input input-bordered flex items-center justify-between">
          Weight (in lbs):
          <div className="bg-mustard-yellow flex items-center justify-between w-16">
            <input
              className="w-16 pl-2 text-xl text-black"
              type="number"
              value={weightLbs}
              onChange={(e) => setWeightLbs(parseFloat(e.target.value))}
              placeholder="Enter your weight"
              required
            />
          </div>
        </label>
        <label className="input input-bordered flex items-center justify-between">
          Goal Weight (in lbs):
          <div className="bg-mustard-yellow flex items-center justify-between w-16">
            <input
              className="w-16 pl-2 text-xl text-black"
              type="number"
              value={goalWeight}
              onChange={(e) => setGoalWeight(parseFloat(e.target.value))}
              placeholder="Enter your goal weight"
              required
            />
          </div>
        </label>
        <label className="input input-bordered flex items-center justify-between">
          Age:
          <div className="bg-mustard-yellow flex items-center justify-between w-16">
            <input
              className="w-16 pl-2 text-xl text-black"
              type="number"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
              placeholder="Enter your age"
              required
            />
          </div>
        </label>
        <label className="input input-bordered flex items-center justify-between" htmlFor="male">
          Gender:
          <div className="flex flow-row">
            <div className="flex flex-row content-evenly w-20">
              <input
                type="radio"
                id="male"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
                background-color="white"
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                className="bg-white"
                type="radio"
                id="female"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </label>
        <label className="input input-bordered flex items-center justify-between h-16">
          Activity Level:
          <div className="p-5">
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
    </div>
  );
};

export default ProfileForm;
