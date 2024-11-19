import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Portal</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate('/teachers-portal')}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          I'm a Teacher
        </button>
        <button
          onClick={() => navigate('/students-portal')}
          className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
        >
          I'm a Student
        </button>
      </div>
    </div>
  );
};

export default HomePage;
