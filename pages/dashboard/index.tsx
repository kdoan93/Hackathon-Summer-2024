import React from "react";
import Head from "next/head";
import NavBar from "../../app/components/NavBar/NavBar";
import DashboardPage from "../../app/components/Dashboard/DashboardPage";
import Food from "../../app/components/FoodEntries/foodEntries";
import Footer from "../../app/components/Footer/Footer";

const Dashboard = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <div className="dashboard-page">
      <NavBar isLoggedIn={isLoggedIn} />
      <div className="container">
        <Head>
          <title>Dashboard | Sustain</title>
        </Head>
        <main className="main-container">
          <h1 className="page-header">Dashboard</h1>
          {/* Dashboard content here */}
          {/* <Food /> */}
          <DashboardPage />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
