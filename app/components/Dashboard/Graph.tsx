import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Graph: React.FC<GraphProps> = ({ userData }) => {
  //   Below is the graph displayed per table from dashboard.
  //   the label map converts the createdAt into a readable date.
  //   the data reads each calorie per collection from userData
  const data = {
    labels: userData?.data.map((info) =>
      new Date(info.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    ),
    datasets: [
      {
        label: "Calories per Meal",
        data: userData?.data.map((info) => info.response.Calories),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Weekly Calories",
      },
    },
  };
  console.log("Graph prop", userData);
  return (
    <div className="flex justify-center w-3/4">
      <Bar data={data} options={options} />
    </div>
  );
};

export default Graph;
