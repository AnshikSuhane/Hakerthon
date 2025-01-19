import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import FoodList from "./components/FoodList";
import FoodSelection from "./components/FoodSelection";
import About from "./components/About"; // Import the About page
import Services from "./components/Services"
import Contact from "./components/Contact";
import ChatBot from "./components/ChatBot";
import FoodForm from "./components/FoodForm";
import Calculator from "./components/Calculator";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar is included here */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/FoodList" element={<FoodList />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/food-selection" element={<FoodSelection />} />
        <Route path="/about" element={<About />} /> {/* Add the About route */}
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/chat" element={<ChatBot />} />
        <Route path="/food-form" element={<FoodForm />} />
        <Route path="/cal" element={<Calculator />} />
      </Routes>
    </Router>
  );
}

export default App;
