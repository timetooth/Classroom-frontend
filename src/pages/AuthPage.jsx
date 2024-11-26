import React, { useState } from 'react';
import Card from '../components/Card';
import UserTypeSelection from '../components/UserTypeSelection';
import AuthForm from '../components/AuthForm';

const AuthPage = () => {
  const [step, setStep] = useState('userType');
  const [userType, setUserType] = useState(null);

  const handleUserTypeSelection = (type) => {
    setUserType(type);
    setStep('login');
  };

  const handleToggleAuthMode = () => {
    setStep(step === 'login' ? 'signup' : 'login');
  };

  const handleBackToUserType = () => {
    setStep('userType');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">LeetCode Academy</h1>
          <p className="text-gray-500 mt-2">Master Data Structures and Algorithms</p>
        </div>

        <Card className="p-6">
          {step === 'userType' && (
            <UserTypeSelection onSelectUserType={handleUserTypeSelection} />
          )}
          
          {(step === 'login' || step === 'signup') && (
            <AuthForm 
              isLogin={step === 'login'}
              userType={userType}
              onBack={handleBackToUserType}
              onToggleAuthMode={handleToggleAuthMode}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;