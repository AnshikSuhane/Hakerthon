import { useState } from 'react';

const Calculator = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('1.2'); // Default sedentary
  const [goal, setGoal] = useState('maintenance');
  const [calories, setCalories] = useState(null);

  // Mifflin-St Jeor Equation
  const calculateCalories = () => {
    if (!age || !gender || !weight || !height) return;

    let BMR;

    // Calculate BMR based on gender
    if (gender === 'male') {
      BMR = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      BMR = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Adjust BMR based on activity level
    const totalCalories = BMR * activityLevel;

    // Adjust based on goal
    if (goal === 'weightLoss') {
      setCalories(totalCalories - 500); // Caloric deficit
    } else if (goal === 'muscleGain') {
      setCalories(totalCalories + 500); // Caloric surplus
    } else {
      setCalories(totalCalories); // Maintenance
    }
  };

  return (
    <div className="bg-gradient-to-r from-teal-100 to-blue-200 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden p-8">
        <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-8">Calorie Calculator</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-indigo-700 mb-2">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-indigo-700 mb-2">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold text-indigo-700 mb-2">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-indigo-700 mb-2">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-indigo-700 mb-2">Activity Level</label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="1.2">Sedentary (little or no exercise)</option>
              <option value="1.375">Lightly Active (light exercise/sports 1-3 days/week)</option>
              <option value="1.55">Moderately Active (moderate exercise/sports 3-5 days/week)</option>
              <option value="1.725">Very Active (hard exercise/sports 6-7 days a week)</option>
              <option value="1.9">Super Active (very hard exercise, physical job, or training twice a day)</option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold text-indigo-700 mb-2">Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="maintenance">Maintain Weight</option>
              <option value="weightLoss">Lose Weight</option>
              <option value="muscleGain">Gain Muscle</option>
            </select>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={calculateCalories}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white text-xl font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transform hover:scale-105 duration-300"
            >
              Calculate Calories
            </button>
          </div>

          {calories !== null && (
            <div className="mt-8 text-center">
              <p className="text-3xl text-indigo-700 font-semibold">
                Your Daily Calorie Need: {Math.round(calories)} kcal
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
