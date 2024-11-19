import React, { useState } from 'react';
import { User, School, ArrowRight, Mail, Lock, ChevronLeft } from 'lucide-react';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-sm border p-4 ${className}`}>
    {children}
  </div>
);

const AuthPage = () => {
  const [step, setStep] = useState('userType'); // userType, login, signup
  const [userType, setUserType] = useState(null); // 'student' or 'teacher'

  const renderUserTypeSelection = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center mb-6">I am a...</h2>
      <button
        onClick={() => {
          setUserType('student');
          setStep('login');
        }}
        className="w-full p-6 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <User className="w-6 h-6 mr-3 text-blue-500" />
            <div className="text-left">
              <div className="font-medium">Student</div>
              <div className="text-sm text-gray-500">Access your courses and assignments</div>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </button>

      <button
        onClick={() => {
          setUserType('teacher');
          setStep('login');
        }}
        className="w-full p-6 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <School className="w-6 h-6 mr-3 text-blue-500" />
            <div className="text-left">
              <div className="font-medium">Teacher</div>
              <div className="text-sm text-gray-500">Manage your classes and students</div>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </button>
    </div>
  );

  const renderAuthForm = (isLogin) => (
    <div className="space-y-6">
      <div className="flex items-center">
        <button 
          onClick={() => setStep('userType')}
          className="text-gray-500 hover:text-gray-700 p-2 -ml-2 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold ml-2">
          {isLogin ? 'Welcome back!' : 'Create an account'}
        </h2>
      </div>

      <div className="text-sm text-gray-500 flex items-center">
        {userType === 'student' ? (
          <User className="w-4 h-4 mr-2" />
        ) : (
          <School className="w-4 h-4 mr-2" />
        )}
        Signing in as a {userType}
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <div className="relative">
            <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="relative">
            <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
        </div>

        {!isLogin && (
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm your password"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isLogin ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      <div className="text-center text-sm">
        {isLogin ? (
          <p>
            Don't have an account?{' '}
            <button
              onClick={() => setStep('signup')}
              className="text-blue-500 hover:text-blue-600"
            >
              Sign up
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <button
              onClick={() => setStep('login')}
              className="text-blue-500 hover:text-blue-600"
            >
              Sign in
            </button>
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">LeetCode Academy</h1>
          <p className="text-gray-500 mt-2">Master Data Structures and Algorithms</p>
        </div>

        <Card className="p-6">
          {step === 'userType' && renderUserTypeSelection()}
          {step === 'login' && renderAuthForm(true)}
          {step === 'signup' && renderAuthForm(false)}
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;