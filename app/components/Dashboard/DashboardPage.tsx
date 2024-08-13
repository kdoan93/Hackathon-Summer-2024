"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Graph from "./Graph";
import FoodEntries from "../FoodEntries/foodEntries";
import Profile from "../Profile/ProfileComponent";

// Below is to define types for typescript errors
interface ResponseData {
  Calories: number;
  TotalFat: number;
  Cholesterol: number;
  Sodium: number;
  TotalCarbohydrate: number;
  Protein: number;
}

interface DataArray {
  _id: string;
  createdAt: Date;
  prompt: string;
  response: ResponseData;
}

interface UserData {
  _id: string;
  userId: string;
  prompt: string;
  response: ResponseData;
  createdAt: string;
  data: DataArray[];
}

const DashboardPage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [trigger, setTrigger] = useState(true);
  const { user } = useUser();
  const userId = user?.id;

  // Below gets user data by userId
  useEffect(() => {
    const loadData = async () => {
      if (!userId) {
        setError("User ID is not available");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(
          `/api/foodEntries/getAllFoodEntries?userId=${encodeURIComponent(
            userId
          )}`
        );
        if (!res.ok) {
          throw new Error("Data not fetched: Network Failure");
        }
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        setError("Failed to fetch data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [userId, trigger]);

  return (
    <div className="dashboard-main w-[80vw] mx-auto h-[80vh] flex flex-col items-center justify-center gap-5">
      <div className="dashboard-graph-profile flex flex-row gap-5">
        <Graph userData={userData} />
        <Profile />
      </div>
      <FoodEntries />
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
