"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import ProfileForm from "../Forms/ProfileForm";

interface ProfileData {
  id: string;
  userId: string;
  heightInch: number;
  weightLbs: number;
  age: number;
  activityLevel: string;
  bmi: number;
  bmiCategory: string;
  createdAt: string;
}

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const userId = user?.id;
  const [needsRefresh, setNeedsRefresh] = useState<boolean>(false);

  console.log("user: ", user); // Check what is logged for user
  console.log("userId: ", userId); // Check what is logged for userId

  useEffect(() => {
    const loadData = async () => {
      if (!userId) {
        console.error("User ID is not available.");
        setError("User ID is not available.");
        setLoading(false);
        return;
      }

      console.log("Fetching profile for userId: ", userId);

      try {
        const url = `/api/getProfile?userId=${encodeURIComponent(userId)}`;
        console.log("Fetching from URL: ", url);
        const res = await fetch(url);

        console.log("API response status: ", res.status);
        const data = await res.json();
        console.log("Fetched Profile Data: ", data);

        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.statusText}`);
        }

        if (data && data.userId) {
          setProfileData(data);
        } else {
          console.log("No profile found for user:", userId);
          setProfileData(null);
        }
      } catch (error) {
        setError("Failed to fetch profile data.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        setNeedsRefresh(false); // Reset the refresh flag
      }
    };

    loadData();
  }, [userId, needsRefresh]);

  const handleProfileCreated = () => {
    setNeedsRefresh(true); // Trigger a re-fetch
  };

  if (loading) {
    return <div>Loading...</div>; // Replace with a proper loading component if needed
  }

  return (
    <div className="profile-page">
      {profileData ? (
        <div className="profile-details">
          <h1>Your Profile</h1>
          <p>
            <strong>Height:</strong> {Math.floor(profileData.heightInch / 12)} ft {profileData.heightInch % 12} in
          </p>
          <p>
            <strong>Weight:</strong> {profileData.weightLbs} lbs
          </p>
          <p>
            <strong>Age:</strong> {profileData.age} years
          </p>
          <p>
            <strong>Activity Level:</strong> {profileData.activityLevel}
          </p>
          <p>
            <strong>BMI:</strong> {profileData.bmi}
          </p>
          <p>
            <strong>BMI Category:</strong> {profileData.bmiCategory}
          </p>
          <p>
            <strong>Profile Created At:</strong> {new Date(profileData.createdAt).toLocaleDateString()}
          </p>
          {/* Optionally add an Edit or Delete button here */}
        </div>
      ) : (
        <ProfileForm onProfileCreated={handleProfileCreated} />
      )}
    </div>
  );
};

export default Profile;
