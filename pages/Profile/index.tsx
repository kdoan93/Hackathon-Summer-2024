import React from "react";
import Head from "next/head";
import NavBar from "../../app/components/NavBar/NavBar";

const Profile = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <div className="profile-page">
      <NavBar isLoggedIn={isLoggedIn} />
      <div className="container">
        <Head>
          <title>Profile | Sustain</title>
        </Head>
        <main>
          <h1>Profile</h1>
          {/* Profile content here */}
        </main>
        <footer>
          <p className="copyright">© 2024 Sustain</p>
        </footer>
      </div>
    </div>
  );
};

export default Profile;
