"use client";
import React, { useState, useEffect } from "react";
import Profile from "../Profile/ProfileComponent";
import WeightLineChart from "./WeightLineChart";
import DailyNutrientComparisonChart from "./DailyNutrientComparisonChart";

// Below is to define types for typescript errors
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
  userId: string;
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

interface UserFoodEntries {
  data: InfoData[];
}

interface InfoData {
  createdAt: Date;
  response: ResponseData;
  _id: string;
  userId: string;
  prompt: string;
}

interface DashboardPageProps {
  userId: string;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ userId }) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [userFoodEntries, setUserFoodEntries] = useState<UserFoodEntries | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [needsRefresh, setNeedsRefresh] = useState<boolean>(false);

  console.log("profile: ", profileData);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`/api/getProfile?userId=${encodeURIComponent(userId)}`);

        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.statusText}`);
        }
        const data = await res.json();

        if (data && data.userId) {
          setProfileData(data);
        } else {
          setProfileData(null);
        }
      } catch (error) {
        setError("Failed to fetch profile data.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        setNeedsRefresh(false); // Reset the refresh flag
      }
    };

    loadData();
  }, [needsRefresh]);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const res = await fetch(`/api/foodEntries/getAllFoodEntries?userId=${encodeURIComponent(userId)}`);

        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.statusText}`);
        }
        const data = await res.json();

        if (data) {
          setUserFoodEntries(data);
        } else {
          setUserFoodEntries(null);
        }
      } catch (error) {
        setError("Failed to fetch User's Food Entries.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEntries();
  }, [needsRefresh]);

  const aggregateNutrientData = (userFoodEntries: InfoData[]): ResponseData => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

    // Initialize totals
    const totals: ResponseData = {
      Calories: 0,
      TotalFat: 0,
      Cholesterol: 0,
      Sodium: 0,
      TotalCarbohydrate: 0,
      Protein: 0,
      Fiber: 0
    };

    userFoodEntries.forEach((entry) => {
      const entryDate = new Date(entry.createdAt).toISOString().split("T")[0];
      if (entryDate === today) {
        totals.Calories += entry.response.Calories || 0;
        totals.TotalFat += entry.response.TotalFat || 0;
        totals.Cholesterol += entry.response.Cholesterol || 0;
        totals.Sodium += entry.response.Sodium || 0;
        totals.TotalCarbohydrate += entry.response.TotalCarbohydrate || 0;
        totals.Protein += entry.response.Protein || 0;
        totals.Fiber += entry.response.Fiber || 0;
      }
    });
    return totals;
  };

  const aggregatedNutrientData = userFoodEntries ? aggregateNutrientData(userFoodEntries.data) : null;

  const handleProfileCreated = () => {
    setNeedsRefresh(true); // Trigger a re-fetch
  };

  if (loading) {
    return <div>Loading...</div>; // Replace with a proper loading component if needed
  }

  return (
    <div className="dashboard-main w-[80vh] flex flex-col items-center justify-start gap-5 h-auto">
      <div className="dashboard-graph-profile flex flex-row h-auto gap-5 w-full">
        <div className="charts-verticle-container justify-around flex flex-wrap flex-row w-full h-auto">
          <Profile profileData={profileData} onProfileCreated={handleProfileCreated} />
        </div>
        <div className="w-full flex items-center justify-center">
          <WeightLineChart profileData={profileData} />
        </div>
      </div>
      <div className="seperated-dailies-container flex flex-row flex-wrap justify-center h-100 w-full gap-5">
        <div className="w-auto">
          <DailyNutrientComparisonChart
            profileData={profileData}
            nutrientName="Calories"
            goalValue={profileData?.dailyCaloricIntake}
            currentIntake={aggregatedNutrientData?.Calories}
          />
        </div>
        <div className="w-auto">
          <DailyNutrientComparisonChart
            profileData={profileData}
            nutrientName="Protein"
            goalValue={profileData?.dailyProtein}
            currentIntake={aggregatedNutrientData?.Protein}
          />
        </div>
        <div className="w-auto">
          <DailyNutrientComparisonChart
            profileData={profileData}
            nutrientName="TotalCarbohydrate"
            goalValue={profileData?.dailyCarbs}
            currentIntake={aggregatedNutrientData?.TotalCarbohydrate}
          />
        </div>
        <div className="w-auto">
          <DailyNutrientComparisonChart
            profileData={profileData}
            nutrientName="TotalFat"
            goalValue={profileData?.dailyFat}
            currentIntake={aggregatedNutrientData?.TotalFat}
          />
        </div>
        <div className="w-auto">
          <DailyNutrientComparisonChart
            profileData={profileData}
            nutrientName="Sodium"
            goalValue={profileData?.dailySodium}
            currentIntake={aggregatedNutrientData?.Sodium}
          />
        </div>
      </div>
      <style>
        {`
        @media(max-width:768px){
          .dashboard-graph-profile{
            flex-direction:column;
            align-items:center
          }
        }
        `}
      </style>
    </div>
  );
};

export default DashboardPage;
