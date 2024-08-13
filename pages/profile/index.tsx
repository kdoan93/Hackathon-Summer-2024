import React, { useEffect, useState } from "react";
import Head from "next/head";
import NavBar from "../../app/components/NavBar/NavBar";
import ProfileComponent from "../../app/components/Profile/ProfileComponent";
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";
import Footer from "../../app/components/Footer/Footer";

const Profile: React.FC = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        router.push("/");
      } else {
        setCheckingAuth(false);
      }
    }
  }, [isLoaded, isSignedIn, router]);

  if (checkingAuth) {
    return <div>Loading...</div>; // Or render a loading spinner
  }

  return (
    <div className="profile-page">
      <NavBar isLoggedIn={isSignedIn || false} />
      <div className="container">
        <Head>
          <title>Profile | Sustain</title>
        </Head>
        <main className="main-container">
          <h1 className="page-header">Profile</h1>
          <ProfileComponent />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
