"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

interface UserData {
  id: string;
  userId: string;
  prompt: string;
  response: object;
  createdAt: string;
}

const DashboardPage: React.FC = () => {
  const [userData, setUserData] = useState<UserData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const userId = user?.id;

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

  // console.log("userData", userData);

  return (
    <>
      <h2 className="">Dashboard component placeholder</h2>
    </>
  );
};

export default DashboardPage;
