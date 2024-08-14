import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

interface ResponseData {
  CaloricIntake: number;
  TotalFat: number;
  Cholesterol: number;
  Sodium: number;
  TotalCarbohydrate: number;
  Protein: number;
  Fiber: number;
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

interface DailyNutrientComparisonChartProps {
  userFoodEntries: UserFoodEntries | null;
  profileData: ProfileData;
  nutrientName: keyof ResponseData;
  goalValue: number;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DailyNutrientComparisonChart: React.FC<DailyNutrientComparisonChartProps> = ({
  userFoodEntries,
  nutrientName,
  goalValue
}) => {
  const [currentIntake, setCurrentIntake] = useState<number>(0);

  useEffect(() => {
    if (userFoodEntries) {
      // Aggregate the current day's nutrient intake
      const today = new Date().toISOString().split("T")[0];
      const todayData = userFoodEntries.data.filter(
        (info) => new Date(info.createdAt).toISOString().split("T")[0] === today
      );

      const aggregatedValue = todayData.reduce((sum, entry) => sum + entry.response[nutrientName], 0);

      setCurrentIntake(aggregatedValue);
    }
  }, [userFoodEntries, nutrientName]);

  if (!userFoodEntries) {
    return <div>No user data available</div>;
  }

  const data = {
    labels: [`Current ${nutrientName}`, `Goal ${nutrientName}`], // Labels for the two data points
    datasets: [
      {
        label: `${nutrientName} (Current vs Goal)`,
        data: [currentIntake, goalValue],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 2
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
        text: `Current vs Goal ${nutrientName}`
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Metric"
        }
      },
      y: {
        title: {
          display: true,
          text: `${nutrientName} (g)`
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

export default DailyNutrientComparisonChart;
