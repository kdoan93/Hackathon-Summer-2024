import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

interface ResponseData {
  Calories: number;
  TotalFat: number;
  Cholesterol: number;
  Sodium: number;
  TotalCarbohydrate: number;
  Protein: number;
  Fiber: number;
}

interface InfoData {
  createdAt: Date;
  response: ResponseData;
  _id: string;
  userId: string;
  prompt: string;
}

interface UserFoodEntries {
  data: InfoData[];
}

interface ProfileData {
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

interface WeightComparisonChartProps {
  profileData: ProfileData | null;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WeightComparisonChart: React.FC<WeightComparisonChartProps> = ({ profileData }) => {
  if (!profileData) {
    return <div>No data available</div>;
  }

  const data = {
    labels: ["Current Weight", "Goal Weight"], // Labels for the two data points
    datasets: [
      {
        label: "Weight (lbs)",
        data: [profileData.weightLbs, profileData.goalWeight],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false // Hide the legend as we have only one dataset
      },
      title: {
        display: true,
        text: "Weight Goals"
      }
    },
    scales: {
      x: {
        title: {
          display: false
        }
      },
      y: {
        title: {
          display: true,
          text: "Weight (lbs)"
        },
        beginAtZero: true
      }
    }
  };

  return (
    <div className="flex justify-center border-4 border-mustard-yellow rounded-2xl w-full h-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default WeightComparisonChart;
