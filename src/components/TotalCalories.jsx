/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react';

const TotalCalories = ({ selectedItems }) => {
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    const calculateCalories = () => {
      const total = selectedItems.reduce((sum, item) => sum + item.calories, 0);
      setTotalCalories(total);
    };
    calculateCalories();
  }, [selectedItems]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-xs mx-auto mt-6">
      <h3 className="text-2xl font-semibold text-center text-gray-800">
        Total Calories
      </h3>
      <p className="text-xl text-center text-gray-600 mt-4">
        {totalCalories} kcal
      </p>
      {totalCalories > 0 && (
        <p className="text-center text-sm text-gray-500 mt-2">
          Great job tracking your calories!
        </p>
      )}
    </div>
  );
};

export default TotalCalories;
