import  { useState } from "react";
import {  Mic, X } from "lucide-react";

const foodCalories = {
  apple: 95,
  banana: 105,
  orange: 62,
  "chicken breast": 165,
  spinach: 23,
  carrot: 41,
  broccoli: 55,
  burger: 354,
  avocado: 160,
  grapes: 104,
  salmon: 208,
  egg: 155,
  pasta: 221,
  rice: 206,
  "sweet potato": 112,
  almonds: 579,
  chocolate: 546,
  cheese: 402,
};

const foodTips = {
  apple: "Apples are a great source of fiber. Perfect for a healthy snack!",
  banana: "Bananas provide potassium, which helps in muscle recovery.",
  orange:
    "Oranges are rich in Vitamin C. Boost your immunity with this citrus fruit.",
  "chicken breast":
    "Chicken breast is a lean protein, ideal for building muscle.",
  spinach:
    "Spinach is packed with iron and vitamins, perfect for boosting energy.",
  carrot: "Carrots are high in Vitamin A, great for eye health!",
  broccoli:
    "Broccoli is full of fiber and antioxidants, supporting digestion and overall health.",
  burger:
    "Burgers can be high in calories and fat. Try a healthier version with lean meat and veggies!",
  avocado: "Avocados are rich in healthy fats, great for heart health.",
  grapes: "Grapes are rich in antioxidants, helping to reduce inflammation.",
  salmon:
    "Salmon is a great source of Omega-3 fatty acids, which are good for the heart.",
  egg: "Eggs are a great source of protein and essential vitamins.",
  pasta:
    "Pasta can be a great energy source when paired with a healthy sauce like tomato or vegetables.",
  rice: "Rice is a great carbohydrate source, ideal for energy replenishment.",
  "sweet potato":
    "Sweet potatoes are high in Vitamin A and are a healthier alternative to regular potatoes.",
  almonds: "Almonds are a great source of healthy fats, protein, and fiber.",
  chocolate:
    "Chocolate, especially dark chocolate, contains antioxidants and can be a healthy indulgence when eaten in moderation.",
  cheese:
    "Cheese is high in calcium, good for strong bones, but it's also high in fat, so enjoy in moderation.",
};

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! Ask me about the calories of a food item.", isUser: false },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const synthesizeSpeech = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input) return;

    const userMessage = { text: input, isUser: true };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const normalizedInput = input.toLowerCase().trim();
      let response = "Sorry, I don’t have information about that food item.";
      let tip = "";

      // Casual responses
      if (normalizedInput === "hello" || normalizedInput === "hi") {
        response = "Hello! How can I assist you today?";
      } else if (normalizedInput === "bye" || normalizedInput === "goodbye") {
        response = "Goodbye! Have a great day!";
      } else if (
        normalizedInput === "how are you" ||
        normalizedInput === "how are you doing"
      ) {
        response =
          "I'm doing great, thank you for asking! How can I help you today?";
      } else {
        // Check if the food item exists in the database
        if (foodCalories[normalizedInput]) {
          response = `${
            normalizedInput.charAt(0).toUpperCase() + normalizedInput.slice(1)
          } has ${foodCalories[normalizedInput]} calories.`;
          tip = foodTips[normalizedInput] || "Enjoy your meal!";
        }
      }

      const botMessage = { text: response, isUser: false };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      if (tip) {
        const tipMessage = { text: `Tip: ${tip}`, isUser: false };
        setMessages((prevMessages) => [...prevMessages, tipMessage]);
      }

      synthesizeSpeech(`${response} ${tip}`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-300 to-pink-400 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-4 space-y-4">
        <div className="flex items-center justify-between bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg shadow-md">
          <h1 className="font-bold text-lg">Calories Counter Chatbot</h1>
          <X
            className="w-6 h-6 cursor-pointer"
            onClick={() => window.location.reload()}
          />
        </div>
        <div className="overflow-y-auto max-h-80 space-y-4 p-4 bg-gray-100 rounded-xl shadow-inner">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs rounded-xl p-3 ${
                  message.isUser ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                <p>{message.text}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-xs rounded-xl p-3 bg-gray-300">
                <p>Thinking...</p>
              </div>
            </div>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-between"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about the calories of a food item..."
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="ml-2 text-white bg-purple-600 p-3 rounded-full"
          >
            {loading ? "..." : <Mic className="w-6 h-6" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
