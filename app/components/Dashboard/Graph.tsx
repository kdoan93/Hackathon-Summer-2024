import React from "react";
import { Bar } from "react-chartjs-2";
import { ObjectId } from "mongodb";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

interface ResponseObject {
  Calories: number;
}

interface InfoData {
  createdAt: Date;
  response: ResponseObject;
}

interface UserData {
  data: InfoData[];
}

// interface GraphProps {
//   _id: ObjectId;
//   createdAt: Date;
//   prompt: string;
//   response: Object;
//   userId: string;
//   userData: UserData;
// }
interface GraphProps {
  _id?: ObjectId; // Optional if not needed
  createdAt?: Date; // Optional if not needed
  prompt?: string; // Optional if not needed
  response?: Object; // Optional if not needed
  userId?: string; // Optional if not needed
  userData?: UserData | null; // Allow null or undefined
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Graph: React.FC<GraphProps> = ({ userData }) => {
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
    <div className="flex justify-center w-full">
      <div className="w-full max-w-screen-lg h-[400px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Graph;
