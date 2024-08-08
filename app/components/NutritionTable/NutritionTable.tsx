"use client";
import React from "react";
import "./NutritionTable.css";

interface NutritionTableProps {
  response: {
    [key: string]: string | number;
  };
}

const NutritionTable: React.FC<NutritionTableProps> = ({ response }) => {
  if (!response) {
    return null; // Render nothing if response is not provided
  }

  // Convert response object to an array for easy mapping
  const data = Object.keys(response).map((key) => ({
    label: key,
    value: response[key]
  }));

  return (
    <div className="table-main-cont">
      <div className="table-cont">
        <title>{}</title>
        <h1 id="nutrition-heading">Nutritional Information</h1>
        <table className="nutrition-table">
          <thead>
            <tr>
              <th scope="col">Nutrient</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="nutri-labels">{item.label}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NutritionTable;
