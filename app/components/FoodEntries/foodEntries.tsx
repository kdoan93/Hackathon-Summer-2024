"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

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

interface UserFoodEntries {
  _id: string;
  userId: string;
  prompt: string;
  response: ResponseData;
  createdAt: string;
  data: DataArray[];
}

const FoodEntries: React.FC = () => {
  const [userFoodEntries, setUserFoodEntries] = useState<UserFoodEntries | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [trigger, setTrigger] = useState(true);
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
        const res = await fetch(`/api/foodEntries/getAllFoodEntries?userId=${encodeURIComponent(userId)}`);
        if (!res.ok) {
          throw new Error("Data not fetched: Network Failure");
        }
        const data = await res.json();
        setUserFoodEntries(data);
      } catch (error) {
        setError("Failed to fetch data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [userId, trigger]);

  //Below remove row from table
  const handleDelete = async (id: string, userId: string): Promise<void> => {
    if (!userId) {
      console.error("User ID is undefined");
      return;
    }

    try {
      const response = await fetch(
        `/api/foodEntries/deleteFoodEntry?logId=${encodeURIComponent(id)}&userId=${encodeURIComponent(userId)}`,
        {
          method: "DELETE"
        }
      );
      const result = await response.json();

      if (response.ok) {
        setTrigger(!trigger);
      } else {
        console.error("Delete failed:", result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="dashboard-main flex flex-col items-center justify-center gap-20">
      {/* Calorie chart section */}
      <div className="overflow-x-auto">
        <div className="overflow-y-auto h-120">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Date</th>
                <th>Meal</th>
                <th>Calories</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {userFoodEntries?.data.map((info) => {
                // Below reformats the date
                const formattedDate = new Date(info.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                });
                return (
                  <tr key={info._id} className="hover bg-base-200">
                    <td>{formattedDate}</td>
                    <td>{info.prompt}</td>
                    <td>{info.response?.Calories}</td>
                    <td>
                      <button
                        className="btn btn-xs sm:btn-sm md:btn-md lg:btn-sm border-gray-300 rounded-md"
                        onClick={() => handleDelete(info._id, userId as string)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FoodEntries;
