"use client";
import React, { useState, useEffect } from "react";
import Profile from "../Profile/ProfileComponent";
import WeightLineChart from "./WeightLineChart";
import DailyNutrientComparisonChart from "./DailyNutrientComparisonChart";

// Below is to define types for typescript errors
interface ResponseData {
  CaloricIntake: number;
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

interface DashboardPageProps {
  userId: string;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ userId }) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [trigger, setTrigger] = useState(true);
  const [needsRefresh, setNeedsRefresh] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`/api/getProfile?userId=${encodeURIComponent(userId)}`);

        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.statusText}`);
        }
        const data = await res.json();
        console.log("data:", data);

        if (data && data.userId === userId) {
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
  }, [userId, needsRefresh]);

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
          {/* <WeightLineChart profileData={profileData} /> */}
        </div>
      </div>
      <div className="seperated-dailies-container flex flex-row flex-wrap justify-center h-100 w-full gap-5">
        <div className="w-auto">
          {/* <DailyNutrientComparisonChart
            userFoodEntries={userFoodEntries}
            nutrientName="CaloricIntake"
            goalValue={profileData?.dailyCaloricIntake}
          /> */}
        </div>
        <div className="w-auto">
          {/* <DailyNutrientComparisonChart userFoodEntries={userFoodEntries} profileData={profileData} nutrientName="Protein" /> */}
        </div>
        <div className="w-auto">
          {/* <DailyNutrientComparisonChart userFoodEntries={userFoodEntries} profileData={profileData} nutrientName="TotalFat" /> */}
        </div>
        <div className="w-auto">
          {/* <DailyNutrientComparisonChart
            userFoodEntries={userFoodEntries}
            profileData={profileData}
            nutrientName="TotalCarbohydrate"
          /> */}
        </div>
        <div className="w-auto">
          {/* <DailyNutrientComparisonChart userFoodEntries={userFoodEntries} profileData={profileData} nutrientName="Fiber" /> */}
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
