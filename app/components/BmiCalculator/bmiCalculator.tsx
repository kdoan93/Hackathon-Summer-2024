import { useState, ChangeEvent, FormEvent } from "react";

export default function BMICalculator() {
  const [height, setHeight] = useState<number | string>("");
  const [weight, setWeight] = useState<number | string>("");
  const [bmi, setBMI] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = Number(height) / 100;
      const calculatedBMI = (Number(weight) / (heightInMeters * heightInMeters)).toFixed(2);
      const bmiValue = parseFloat(calculatedBMI);
      setBMI(bmiValue);

      let bmiCategory = "";
      if (bmiValue < 18.5) {
        bmiCategory = "Underweight";
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        bmiCategory = "Normal weight";
      } else if (bmiValue >= 25 && bmiValue < 29.9) {
        bmiCategory = "Overweight";
      } else {
        bmiCategory = "Obesity";
      }
      setCategory(bmiCategory);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    calculateBMI();
  };

  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  return (
    <div>
      <h1>BMI Calculator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="height">Height (cm):</label>
          <input type="number" id="height" value={height} onChange={handleHeightChange} required />
        </div>
        <div>
          <label htmlFor="weight">Weight (kg):</label>
          <input type="number" id="weight" value={weight} onChange={handleWeightChange} required />
        </div>
        <button type="submit">Calculate BMI</button>
      </form>

      {bmi !== null && (
        <div>
          <h2>Your BMI: {bmi}</h2>
          <h3>Category: {category}</h3>
        </div>
      )}
    </div>
  );
}
