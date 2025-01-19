import { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  ArrowUpDown,
  Plus,
  Minus,
  QrCode,
  X,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FoodSelection = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://hackathon-backend-srsa.onrender.com/api/foods/"
        );
        setFoodItems(response.data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch food items. Please try again later.");
        console.error("Error fetching food items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  const toggleSelection = (item) => {
    const isSelected = selectedItems.some(
      (selected) => selected._id === item._id
    );

    if (isSelected) {
      setSelectedItems(
        selectedItems.filter((selected) => selected._id !== item._id)
      );
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (itemId, change) => {
    setSelectedItems(
      selectedItems.map((item) =>
        item._id === itemId
          ? { ...item, quantity: Math.max(item.quantity + change, 1) }
          : item
      )
    );
  };

  const addItemToSelection = (item) => {
    const isSelected = selectedItems.some(
      (selected) => selected._id === item._id
    );
    if (!isSelected) {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  const calculateTotalCalories = () => {
    return selectedItems.reduce(
      (acc, item) => acc + item.calories * item.quantity,
      0
    );
  };

  const generateQRCode = async () => {
    try {
      const totalCalories = calculateTotalCalories();
      const qrData = {
        totalCalories,
        itemCount: selectedItems.length,
        foodItems: selectedItems.map((item) => ({
          foodName: item.name, // Send food name
          quantity: item.quantity, // Send quantity
        })),
      };

      const response = await axios.post(
        "https://hackathon-backend-srsa.onrender.com/api/scan/generate",
        { qrData }
      );
      setQrCodeData(response.data.qrData);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const filteredAndSortedItems = foodItems
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const order = sortOrder === "asc" ? 1 : -1;
      return order * (a.calories - b.calories);
    });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100">
        <div className="animate-pulse text-2xl text-indigo-600 font-semibold">
         
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex items-center justify-center text-red-500 mb-4">
            <AlertCircle className="w-12 h-12" />
          </div>
          <p className="text-center text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            Choose Your Food
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select your favorite foods and track your calories with our
            intuitive food selection system.
          </p>
        </div>

        {/* Search and Sort Controls */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search foods..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-indigo-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-300"
            />
          </div>
          <button
            onClick={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
          >
            <ArrowUpDown className="w-5 h-5 text-indigo-600" />
            <span className="text-gray-700">
              {sortOrder === "asc" ? "Low to High" : "High to Low"}
            </span>
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Food Items Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredAndSortedItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="relative h-48">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {item.category && (
                    <span className="absolute bottom-2 right-2 px-2 py-1 bg-indigo-600 text-white text-sm rounded-full">
                      {item.category}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-indigo-600 font-medium">
                      {item.calories} calories
                    </span>
                    {item.protein && (
                      <span className="text-sm text-gray-500">
                        Protein: {item.protein}g
                      </span>
                    )}
                  </div>
                  {selectedItems.some(
                    (selected) => selected._id === item._id
                  ) ? (
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleQuantityChange(item._id, -1)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors duration-200"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="font-medium text-gray-700">
                        {selectedItems.find(
                          (selected) => selected._id === item._id
                        )?.quantity || 0}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item._id, 1)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors duration-200"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addItemToSelection(item)}
                      className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                    >
                      Add to Selection
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Selected Items Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Selected Items
              </h2>
              {selectedItems.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No items selected yet. Start by adding some foods!
                </p>
              ) : (
                <>
                  <ul className="space-y-4 mb-6">
                    {selectedItems.map((item) => (
                      <li
                        key={item._id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <span className="font-medium text-gray-800">
                            {item.name}
                          </span>
                          <p className="text-sm text-gray-500">
                            {item.calories * item.quantity} calories
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-600">
                            × {item.quantity}
                          </span>
                          <button
                            onClick={() => toggleSelection(item)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total Calories:</span>
                      <span className="text-indigo-600">
                        {calculateTotalCalories()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={generateQRCode}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <QrCode className="w-5 h-5" />
                    <span>Generate QR Code</span>
                  </button>
                </>
              )}

              {qrCodeData && (
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Generated QR Code
                  </h3>
                  <img
                    src={qrCodeData}
                    alt="QR Code"
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add Item Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/food-form")} // Navigating to the Food Form page
            className="py-3 px-6 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300"
          >
            Add New Food Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodSelection;
