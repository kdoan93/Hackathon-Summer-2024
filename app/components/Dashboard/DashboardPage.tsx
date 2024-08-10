"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Graph from "./Graph";

// Below is to define types for typescript errors
interface ResponseData {
  Calories: number;
  TotalFat: number;
  Cholesterol: number;
  Sodium: number;
  TotalCarbohydrate: number;
  Protein: number;
}

interface UserData {
  id: string;
  userId: string;
  prompt: string;
  response: ResponseData;
  createdAt: string;
}

const DashboardPage: React.FC = () => {
  const [userData, setUserData] = useState<UserData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { user } = useUser();
  const userId = user?.id;

  // Below gets user data buy userId
  useEffect(() => {
    const loadData = async () => {
      if (!userId) {
        setError("User ID is not available");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(
          `/api/dashboard/getDashboard?userId=${encodeURIComponent(userId)}`
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
  }, [userId]);

  return (
    <div className="dashboard-main flex flex-col items-center justify-center gap-5">
      <Graph userData={userData} />

      {/* Calorie chart section */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Date</th>
              <th>Meal</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {userData?.data.map((info: UserData) => {
              // Below reformats the date
              const formattedDate = new Date(info.createdAt).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              );
              return (
                <tr key={info.id} className="hover bg-base-200">
                  <td>{formattedDate}</td>
                  <td>{info.prompt}</td>
                  <td>{info.response?.Calories}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;
