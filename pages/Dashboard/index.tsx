"use client";
import React from "react";
import Head from "next/head";
import NavBar from "../../app/components/NavBar/NavBar";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

interface UserData {
  id: string;
  userId: string;
  prompt: string;
  response: object;
  createdAt: string;
}

const Dashboard = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [userData, setUserData] = useState<null>(null);
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
          throw new Error("Data not fetched Network Failure");
        }
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        setError("failed to fetch data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
  console.log("userData", userData);

  return (
    <div className="dashboard-page">
      <NavBar isLoggedIn={isLoggedIn} />
      <div className="container">
        <Head>
          <title>Dashboard | Sustain</title>
        </Head>
        <main>
          <h1>Dashboard</h1>
          {/* Dashboard content here */}
        </main>
        <footer>
          <p className="copyright">© 2024 Sustain</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
