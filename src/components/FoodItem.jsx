const FoodItem = ({ food }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 transform hover:scale-105 transition-all duration-300">
      <h4 className="text-lg font-bold text-gray-800 truncate">{food.name}</h4>
      <p className="text-sm text-gray-600 mt-2">Calories: {food.calories}</p>
    </div>
  );
};

export default FoodItem;
