import React from "react";
import Head from "next/head";
import NavBar from "../../app/components/NavBar/NavBar";
import DashboardPage from "../../app/components/Dashboard/DashboardPage";
import Food from "../../app/components/Food/FoodLog";

const Dashboard = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <div className="dashboard-page">
      <NavBar isLoggedIn={isLoggedIn} />
      <div className="container">
        <Head>
          <title>Dashboard | Sustain</title>
        </Head>
        <main>
          <h1 className="page-header">Dashboard</h1>
          {/* Dashboard content here */}
          {/* <Food /> */}
          <DashboardPage />
        </main>
        <footer>
          <p className="copyright">© 2024 Sustain</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
