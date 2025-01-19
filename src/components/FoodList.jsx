import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get("https://hackathon-backend-srsa.onrender.com/api/foods/");
        setFoods(response.data);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };
    fetchFoods();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 min-h-screen">
      <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-10">
        Explore Delicious Foods
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {foods.map((food) => (
          <div
            key={food._id}
            className="bg-white shadow-md rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300"
          >
            <div className="relative">
              <img
                src={food.imageUrl}
                alt={food.name}
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {food.category}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 truncate">{food.name}</h3>
              <p className="text-gray-600 mt-2 text-sm">{food.calories} Calories</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <button
          className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-lg font-semibold rounded-full shadow-lg hover:from-indigo-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300"
          onClick={() => navigate("/food-selection")}
        >
          Go to Food Selection
        </button>
      </div>
    </div>
  );
};

export default FoodList;
