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
    <div className="profile-page w-80">
      {profileData ? (
        <div className="profile-details flex flex-col items-center gap-4 bg-comp-black p-2 rounded-2xl w-80">
          <h1 className="text-4xl font-bold text-mustard-yellow">Your Profile</h1>
          <div className="flex items-center justify-between w-full px-5 bg-comp-black rounded-full h-10">
            <div>
              <strong className="text-logo-orange">Height:</strong>
            </div>
            <div className="text-mustard-yellow">
              {Math.floor(profileData.heightInch / 12)} ft {profileData.heightInch % 12} in
            </div>
          </div>
          <div className="flex items-center justify-between w-full px-5 bg-comp-black rounded-full h-10">
            <div>
              <strong className="text-logo-orange">Weight:</strong>
            </div>
            <div className="text-mustard-yellow">{profileData.weightLbs} lbs</div>
          </div>
          <div className="flex items-center justify-between w-full px-5 bg-comp-black rounded-full h-10">
            <div>
              <strong className="text-logo-orange">Goal Weight:</strong>
            </div>
            <div className="text-mustard-yellow">{profileData.goalWeight} lbs</div>
          </div>
          <div className="flex items-center justify-between w-full px-5 bg-comp-black rounded-full h-10">
            <div>
              <strong className="text-logo-orange">Age:</strong>
            </div>
            <div className="text-mustard-yellow">{profileData.age} years</div>
          </div>
          <div className="flex items-center justify-between w-full px-5 bg-comp-black rounded-full h-10">
            <div>
              <strong className="text-logo-orange">Activity Level:</strong>
            </div>
            <div className="text-mustard-yellow">{profileData.activityLevel}</div>
          </div>
          <div className="flex items-center justify-between w-full px-5 bg-comp-black rounded-full h-10">
            <div>
              <strong className="text-logo-orange">BMI:</strong>
            </div>
            <div className="text-mustard-yellow">{profileData.bmi.toFixed(2)}</div>
          </div>
          <div className="flex items-center justify-between w-full px-5 bg-comp-black rounded-full h-10">
            <div>
              <strong className="text-logo-orange">BMI Category:</strong>
            </div>
            <div className="text-mustard-yellow">{profileData.bmiCategory}</div>
          </div>
          <div className="flex items-center justify-between w-full px-5 bg-comp-black rounded-full h-10">
            <div>
              <strong className="text-logo-orange">Profile Created At:</strong>
            </div>
            <div className="text-mustard-yellow">{new Date(profileData.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
      ) : (
        <ProfileForm onProfileCreated={handleProfileCreated} />
      )}
    </div>
  );
};

export default Profile;
