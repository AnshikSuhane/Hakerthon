import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://hackathon-backend-srsa.onrender.com/api/auth/login',
        { email, password }
      );
      localStorage.setItem('token', response.data.token);
      navigate('/FoodList');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 animate-gradient">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 transform hover:scale-105 transition-all duration-300">
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 absolute top-3 left-3 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H8m0 0l4-4m-4 4l4 4" />
            </svg>
          </div>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 absolute top-3 left-3 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 .751-.316 1.502-.879 2.065C10.065 13.621 9.314 14 8.563 14c-.75 0-1.502-.316-2.065-.879C5.316 12.502 5 11.751 5 11s.316-1.502.879-2.065C6.435 8.379 7.186 8 7.938 8c.751 0 1.502.316 2.065.879.563.563.879 1.314.879 2.065z" />
            </svg>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-white opacity-10 rounded-full transform scale-0 group-hover:scale-125 transition duration-700"></span>
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            className="text-indigo-500 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
