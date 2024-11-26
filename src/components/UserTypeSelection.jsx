import React from 'react';
import { User, School, ArrowRight } from 'lucide-react';

const UserTypeSelection = ({ onSelectUserType }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold text-center mb-6">I am a...</h2>
    
    {[
      { 
        type: 'student', 
        icon: User, 
        title: 'Student', 
        description: 'Access your courses and assignments' 
      },
      { 
        type: 'teacher', 
        icon: School, 
        title: 'Teacher', 
        description: 'Manage your classes and students' 
      }
    ].map(({ type, icon: Icon, title, description }) => (
      <button
        key={type}
        onClick={() => onSelectUserType(type)}
        className="w-full p-6 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Icon className="w-6 h-6 mr-3 text-blue-500" />
            <div className="text-left">
              <div className="font-medium">{title}</div>
              <div className="text-sm text-gray-500">{description}</div>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </button>
    ))}
  </div>
);

export default UserTypeSelection;