"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import ProfileForm from "../Forms/ProfileForm";

interface ProfileData {
  id: string;
  userId: string;
  heightInch: number;
  weightLbs: number;
  goalWeight: number;
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

  useEffect(() => {
    const loadData = async () => {
      if (!userId) {
        console.error("User ID is not available.");
        setError("User ID is not available.");
        setLoading(false);
        return;
      }

      try {
        const url = `/api/getProfile?userId=${encodeURIComponent(userId)}`;
        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.statusText}`);
        }

        if (data && data.userId) {
          setProfileData(data);
        } else {
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
        <div className="profile-details flex flex-col gap-4">
          <h1 className="text-2xl">Your Profile</h1>
          <p>
            <strong className="text-logo-orange">Height:</strong>{" "}
            {Math.floor(profileData.heightInch / 12)} ft{" "}
            {profileData.heightInch % 12} in
          </p>
          <p>
            <strong className="text-logo-orange">Weight:</strong>{" "}
            {profileData.weightLbs} lbs
          </p>
          <p>
            <strong className="text-logo-orange">Goal Weight:</strong>{" "}
            {profileData.goalWeight} lbs
          </p>
          <p>
            <strong className="text-logo-orange">Age:</strong> {profileData.age}{" "}
            years
          </p>
          <p>
            <strong className="text-logo-orange">Activity Level:</strong>{" "}
            {profileData.activityLevel}
          </p>
          <p>
            <strong className="text-logo-orange">BMI:</strong> {profileData.bmi}
          </p>
          <p>
            <strong className="text-logo-orange">BMI Category:</strong>{" "}
            {profileData.bmiCategory}
          </p>
          <p>
            <strong className="text-logo-orange">Profile Created At:</strong>{" "}
            {new Date(profileData.createdAt).toLocaleDateString()}
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
