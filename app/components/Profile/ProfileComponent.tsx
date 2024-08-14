"use client";
import React, { useState, useEffect } from "react";
import ProfileForm from "../Forms/ProfileForm";

interface ProfileProps {
  profileData: ProfileData | null;
  onProfileCreated: () => void;
}

interface ProfileData {
  userId: string;
  heightInch: number;
  weightLbs: number;
  goalWeight: number;
  age: number;
  gender: string;
  activityLevel: number;
  bmi: number;
  bmiCategory: string;
  dailyCaloricIntake: number;
  dailyFat: number;
  dailyCholesterol: number;
  dailySodium: number;
  dailyCarbs: number;
  dailyProtein: number;
  createdAt: string;
}

const Profile: React.FC<ProfileProps> = ({ profileData, onProfileCreated }) => {
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
        <ProfileForm onProfileCreated={onProfileCreated} />
      )}
    </div>
  );
};

export default Profile;
