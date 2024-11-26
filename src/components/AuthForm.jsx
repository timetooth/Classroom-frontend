import React, { useState } from 'react';
import { User, School, Mail, Lock, ChevronLeft } from 'lucide-react';
import IconInput from './IconInput';

const AuthForm = ({ 
  isLogin, 
  userType, 
  onBack, 
  onToggleAuthMode 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [successPopup, setSuccessPopup] = useState(false); // State for success popup

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
  
    const endpoint = isLogin ? 'http://127.0.0.1:3000/auth/login' : 'http://127.0.0.1:3000/auth';
  
    try {
      const body = isLogin
        ? { email: formData.email, password: formData.password }
        : { 
            name: formData.name, 
            email: formData.email, 
            password: formData.password, 
            confirmPassword: formData.confirmPassword, 
            role: userType 
          };
  
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        if (isLogin) {
          localStorage.setItem('token', data.token); // Store the JWT
  
          // Redirect based on role
          if (data.role === 'student') {
            window.location.href = '/students-portal';
          } else if (data.role === 'teacher') {
            window.location.href = '/teachers-portal';
          } else {
            setMessage('Role not recognized. Please contact support.');
          }
        } else {
          // Show success popup and redirect to login
          setSuccessPopup(true); // Show popup
          setTimeout(() => {
            setSuccessPopup(false); // Hide popup
            onToggleAuthMode(); // Switch to login mode
          }, 3000); // Show popup for 3 seconds
        }
      } else {
        setMessage(data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setMessage('Unable to connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <button 
          onClick={onBack}
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

      <form className="space-y-4" onSubmit={handleSubmit}>
        {!isLogin && (
          <IconInput 
            type="text" 
            label="Name" 
            placeholder="Enter your name" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            icon={User} 
          />
        )}

        <IconInput 
          type="email" 
          label="Email" 
          placeholder="Enter your email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          icon={Mail} 
        />

        <IconInput 
          type="password" 
          label="Password" 
          placeholder="Enter your password" 
          name="password"
          value={formData.password}
          onChange={handleChange}
          icon={Lock} 
        />

        {!isLogin && (
          <IconInput 
            type="password" 
            label="Confirm Password" 
            placeholder="Confirm your password" 
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            icon={Lock} 
          />
        )}

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-lg text-white ${
            loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={loading}
        >
          {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      {message && <p className="text-red-500 text-sm mt-2">{message}</p>}

      <div className="text-center text-sm">
        {isLogin ? (
          <p>
            Don't have an account?{' '}
            <button
              onClick={onToggleAuthMode}
              className="text-blue-500 hover:text-blue-600"
            >
              Sign up
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <button
              onClick={onToggleAuthMode}
              className="text-blue-500 hover:text-blue-600"
            >
              Sign in
            </button>
          </p>
        )}
      </div>

      {/* Success Popup */}
      {successPopup && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded shadow-lg">
          Account created successfully! Redirecting to login...
        </div>
      )}
    </div>
  );
};

export default AuthForm;
