import React, { useEffect } from "react";
import Head from "next/head";
import NavBar from "../../app/components/NavBar/NavBar";
import ProfileComponent from "../../app/components/Profile/ProfileComponent";
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";

const Profile: React.FC = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/");
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) {
    return null; // Or render a loading state
  }

  return (
    <div className="profile-page">
      <NavBar isLoggedIn={isSignedIn} />
      <div className="container">
        <Head>
          <title>Profile | Sustain</title>
        </Head>
        <main>
          <h1>Profile</h1>
          <ProfileComponent />
        </main>
        <footer>
          <p className="copyright">© 2024 Sustain</p>
        </footer>
      </div>
    </div>
  );
};

export default Profile;
