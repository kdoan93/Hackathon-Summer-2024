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
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const { user } = useUser();
  const userId = user?.id;
  console.log("user", user);

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

  console.log("userData1", userData);

  //Below filters the data based on dates selected
  const filterDataByWeek = (data: UserData[]) => {
    if (!startDate || !endDate) return data;

    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    return data.filter((item) => {
      const itemDate = new Date(item.createdAt).getTime();
      return itemDate >= start && itemDate <= end;
    });
  };

  const filteredData = userData ? filterDataByWeek(userData.data) : [];

  return (
    <div className="dashboard-main flex flex-col items-center justify-center gap-5">
      <Graph userData={{ data: filteredData }} />

      {/* Date selection inputs*/}
      <div className="flex space-x-4 my-4">
        <div>
          <label
            htmlFor="start-date"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="end-date"
            className="block text-sm font-medium text-gray-700"
          >
            End Date
          </label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
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
                <tr
                  key={info.id}
                  className="hover bg-base-200"
                  onClick={() => setCurrMeal(info.response)}
                >
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
