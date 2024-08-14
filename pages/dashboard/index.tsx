import React, { useEffect } from "react";
import Head from "next/head";
import NavBar from "../../app/components/NavBar/NavBar";
import DashboardPage from "../../app/components/Dashboard/DashboardPage";
import Footer from "../../app/components/Footer/Footer";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

const Dashboard = () => {
  const { user, isLoaded } = useUser();
  const userId = user?.id;
  const router = useRouter();

  useEffect(() => {
    if (!userId && isLoaded) {
      router.push("/");
    }
  }, [isLoaded, userId, router]);

  return (
    <div className="dashboard-page">
      <NavBar />
      <div className="container">
        <Head>
          <title>Dashboard | Sustain</title>
          <link rel="icon" href="/images/sustainlogo-peach.png" />
        </Head>
        <main className="main-container">
          <h1 className="page-header py-12">Dashboard</h1>
          {userId ? <DashboardPage userId={userId} /> : <>Loading...</>}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
