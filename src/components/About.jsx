import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-teal-100 to-blue-200 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden p-8">
        <h1 className="text-5xl font-extrabold text-center text-indigo-600 mb-12 transition-all transform hover:scale-105 hover:text-indigo-800 duration-300">
          About Calorie Calculator
        </h1>
        
        <p className="text-lg text-gray-700 leading-relaxed mb-12 transition-opacity opacity-80 hover:opacity-100 duration-300 hover:text-gray-800">
          A calorie calculator is an essential tool for individuals who are looking to monitor their diet, maintain a healthy lifestyle, or achieve specific fitness goals. The primary function of a calorie calculator is to estimate the total number of calories a person should consume daily, depending on factors such as age, gender, weight, height, activity level, and specific goals like weight loss, weight maintenance, or muscle gain.
        </p>

        <div className="space-y-12">
          {/* Why Use a Calorie Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <h2 className="text-3xl font-semibold text-indigo-700 mb-4 hover:text-indigo-500 tracking-wide">
              Why Use a Calorie Calculator?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed hover:text-gray-800 duration-300">
              Using a calorie calculator is the first step toward making informed dietary decisions. By calculating how many calories your body needs to function optimally, you can ensure that you are consuming the right amount of food. Whether you want to lose weight or gain muscle, understanding your caloric needs is crucial.
            </p>
          </div>

          {/* How Does a Calorie Calculator Work? */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <h2 className="text-3xl font-semibold text-indigo-700 mb-4 hover:text-indigo-500 tracking-wide">
              How Does a Calorie Calculator Work?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4 hover:text-gray-800 duration-300">
              A calorie calculator works by using various formulas and data points such as your age, gender, height, weight, and activity level. The most common formula used for calculating calorie needs is the Mifflin-St Jeor equation. It takes these parameters and estimates how many calories your body needs to maintain its current weight.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed hover:text-gray-800 duration-300">
              The basic idea is that if you consume more calories than your body needs, the excess calories will be stored as fat, leading to weight gain. Conversely, if you consume fewer calories than required, your body will burn stored fat for energy, which leads to weight loss.
            </p>
          </div>

          {/* Factors Considered in the Calorie Calculation */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <h2 className="text-3xl font-semibold text-indigo-700 mb-4 hover:text-indigo-500 tracking-wide">
              Factors Considered in the Calorie Calculation:
            </h2>
            <ul className="list-disc pl-8 text-gray-700 space-y-3 text-lg">
              <li><strong>Age:</strong> Older individuals typically need fewer calories due to slower metabolism.</li>
              <li><strong>Gender:</strong> Men usually require more calories than women due to higher muscle mass.</li>
              <li><strong>Weight and Height:</strong> Heavier and taller individuals generally need more calories as they have more body mass to maintain.</li>
              <li><strong>Activity Level:</strong> A sedentary lifestyle requires fewer calories than an active one. People with a more active lifestyle need more energy.</li>
              <li><strong>Body Composition:</strong> Individuals with more muscle mass tend to burn more calories at rest compared to those with more fat mass.</li>
              <li><strong>Health Conditions:</strong> Certain health conditions, such as thyroid disorders, can affect metabolism and calorie needs.</li>
              <li><strong>Sleep Patterns:</strong> Poor or inadequate sleep can affect your metabolism and hunger hormones, which can alter your calorie needs.</li>
            </ul>
          </div>

          {/* Calorie Calculation for Different Goals */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <h2 className="text-3xl font-semibold text-indigo-700 mb-4 hover:text-indigo-500 tracking-wide">
              Calorie Calculation for Different Goals
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4 text-xl">
              Depending on your goal, you can adjust your daily calorie intake:
            </p>
            <ul className="list-disc pl-8 text-gray-700 space-y-3 text-lg">
              <li><strong>Weight Loss:</strong> Consume fewer calories than your maintenance level to create a calorie deficit, leading to weight loss.</li>
              <li><strong>Weight Maintenance:</strong> Consume the same number of calories as your body burns to maintain your current weight.</li>
              <li><strong>Muscle Gain:</strong> Consume more calories than your body burns to provide the extra energy necessary for muscle growth.</li>
              <li><strong>Improved Performance:</strong> Athletes may need additional calories to support intense training and performance goals.</li>
              <li><strong>Health Maintenance:</strong> Maintain a balanced intake to ensure your body has the necessary nutrients to support general health and wellness.</li>
            </ul>
          </div>

          {/* Conclusion */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <h2 className="text-3xl font-semibold text-indigo-700 mb-4 hover:text-indigo-500 tracking-wide">
              Conclusion
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed hover:text-gray-800 duration-300 text-xl">
              A calorie calculator is a powerful tool that helps you better understand your nutritional needs. By using it, you can make informed decisions about your diet and achieve your desired fitness goals more effectively.
            </p>
          </div>

          {/* Start Using Calculator Button */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => navigate("/cal")}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white text-xl font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transform hover:scale-105 duration-300"
            >
              Start Using the Calculator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
