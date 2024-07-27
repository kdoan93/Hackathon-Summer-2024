"use client";
import React from "react";

function NutritionTable() {
  // Define variables for each nutritional value
  const servingSize = "1 cup (240ml)";
  const calories = 200;
  const totalFat = "8g";
  const cholesterol = "0mg";
  const sodium = "150mg";
  const totalCarbohydrate = "28g";
  const protein = "5g";

  // Data array for the table
  const data = [
    { label: "Serving size", value: servingSize },
    { label: "Calories", value: calories },
    { label: "Total fat", value: totalFat },
    { label: "Cholesterol", value: cholesterol },
    { label: "Sodium", value: sodium },
    { label: "Total Carbohydrate", value: totalCarbohydrate },
    { label: "Protein", value: protein },
  ];

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th scope="col">Nutrient</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.label}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NutritionTable;
