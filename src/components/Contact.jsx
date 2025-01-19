import  { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted successfully!');
    // Add further logic for form submission, e.g., API call, email service
  };

  return (
    <section className="bg-gradient-to-r from-purple-600 to-pink-500 py-16">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-extrabold text-white text-center mb-12">Get In Touch</h2>
        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-800 text-lg font-semibold mb-2">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300 ease-in-out"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-800 text-lg font-semibold mb-2">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300 ease-in-out"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-800 text-lg font-semibold mb-2">Your Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300 ease-in-out"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transition duration-300 ease-in-out"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
