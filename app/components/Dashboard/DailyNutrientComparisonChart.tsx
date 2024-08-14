import React, { useEffect, useState } from "react";

interface ResponseData {
  Calories: number;
  TotalFat: number;
  Cholesterol: number;
  Sodium: number;
  TotalCarbohydrate: number;
  Protein: number;
  Fiber: number;
}

interface ProfileData {
  heightInch: number;
  weightLbs: number;
  goalWeight: number;
  age: number;
  gender: string;
  activityLevel: number;
  bmi: number;
  bmiCategory: string;
  dailyCaloricIntake: number;
  dailyFat: number;
  dailyCholesterol: number;
  dailySodium: number;
  dailyCarbs: number;
  dailyProtein: number;
  createdAt: string;
}

interface InfoData {
  createdAt: Date;
  response: ResponseData;
  _id: string;
  userId: string;
  prompt: string;
}

interface UserFoodEntries {
  data: InfoData[];
}

interface DailyNutrientComparisonProgressBarProps {
  profileData: ProfileData | null;
  nutrientName: keyof ResponseData;
  goalValue: number | undefined;
  currentIntake: number | undefined | null;
}

const DailyNutrientComparisonProgressBar: React.FC<DailyNutrientComparisonProgressBarProps> = ({
  nutrientName,
  goalValue,
  currentIntake
}) => {
  if (goalValue === undefined) {
    return (
      <div className="flex flex-col items-center w-full max-w-sm p-4">
        <div className="flex flex-col items-center w-full max-w-sm p-4">
          <h3 className="text-lg font-bold mb-2">{`${nutrientName} Progress`}</h3>
          <div className="w-full bg-gray-200 rounded-r-full h-6">
            <div />
          </div>
          <div className="mt-2 text-sm flex justify-between w-full">
            <span>Current: {currentIntake} g</span>
            <span>Goal: {goalValue} g</span>
          </div>
        </div>
      </div>
    );
  }
  const progressPercentage = (currentIntake ? currentIntake / goalValue : 0) * 100;
  let progressColor = progressPercentage > 115 ? "bg-orange-500" : "bg-green-500";
  progressColor = progressPercentage > 130 ? "bg-red-500" : progressColor;

  return (
    <div className="flex flex-col items-center w-full max-w-sm p-4">
      <h3 className="text-lg font-bold mb-2">{`${nutrientName} Progress`}</h3>
      <div className="w-full bg-gray-200 rounded-r-full h-6">
        <div className={`${progressColor} h-6 rounded-r-full`} style={{ width: `${progressPercentage}%` }} />
      </div>
      <div className="mt-2 text-sm flex justify-between w-full">
        <span>Current: {currentIntake} g</span>
        <span>Goal: {goalValue} g</span>
      </div>
    </div>
  );
};

export default DailyNutrientComparisonProgressBar;
