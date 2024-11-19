import React, { useState } from 'react';
import { ChevronRight, Award, BookOpen, ExternalLink, Check, Clock, AlertCircle } from 'lucide-react';

// Custom Card Component
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-sm border p-4 ${className}`}>
    {children}
  </div>
);

// Custom Tabs Component
const TabSystem = ({ children, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  const tabs = React.Children.toArray(children).filter(
    child => child.type === Tab
  );
  
  return (
    <div>
      <div className="flex border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.props.value}
            onClick={() => setActiveTab(tab.props.value)}
            className={`px-4 py-2 -mb-px ${
              activeTab === tab.props.value
                ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      {tabs.find(tab => tab.props.value === activeTab)}
    </div>
  );
};

const Tab = ({ children }) => children;

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusStyles = {
    completed: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      icon: Check,
    },
    pending: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      icon: Clock,
    },
    overdue: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      icon: AlertCircle,
    },
  };

  const style = statusStyles[status];
  const Icon = style.icon;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${style.bg} ${style.text}`}>
      <Icon className="w-4 h-4 mr-1" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const StudentPortal = () => {
  const [currentStudent] = useState({
    id: 1,
    name: 'Alice Smith',
    enrolledSubjects: [
      {
        id: 1,
        name: 'Data Structures',
        instructor: 'Dr. Johnson',
        questionsSolved: 15,
        totalQuestions: 20
      },
      {
        id: 2,
        name: 'Algorithms',
        instructor: 'Prof. Williams',
        questionsSolved: 8,
        totalQuestions: 15
      }
    ]
  });

  const [selectedSubject, setSelectedSubject] = useState(currentStudent.enrolledSubjects[0]);

  const [assignments] = useState([
    {
      id: 1,
      title: 'Two Sum',
      leetcodeId: 1,
      dueDate: '2024-11-20',
      status: 'completed',
      description: 'Solve the Two Sum problem using optimal approach',
    },
    {
      id: 2,
      title: 'Valid Parentheses',
      leetcodeId: 20,
      dueDate: '2024-11-25',
      status: 'pending',
      description: 'Implement a solution for valid parentheses checking',
    },
    {
      id: 3,
      title: 'Merge Sort',
      leetcodeId: 912,
      dueDate: '2024-11-15',
      status: 'overdue',
      description: 'Implement merge sort algorithm',
    }
  ]);

  const [classmates] = useState([
    { id: 1, name: 'Alice Smith', questionsSolved: 15, lastActive: '2024-11-15' },
    { id: 2, name: 'Bob Johnson', questionsSolved: 12, lastActive: '2024-11-14' },
    { id: 3, name: 'Carol White', questionsSolved: 18, lastActive: '2024-11-16' },
    { id: 4, name: 'David Brown', questionsSolved: 10, lastActive: '2024-11-16' },
  ]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Student Portal</h1>
        <div className="text-right">
          <h2 className="font-medium">{currentStudent.name}</h2>
          <p className="text-sm text-gray-500">Student ID: {currentStudent.id}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Subjects Sidebar */}
        <div className="md:col-span-1 space-y-4">
          <Card>
            <div className="flex items-center mb-4">
              <BookOpen className="w-4 h-4 mr-2" />
              <h2 className="font-semibold">My Subjects</h2>
            </div>
            <div className="space-y-2">
              {currentStudent.enrolledSubjects.map(subject => (
                <button
                  key={subject.id}
                  onClick={() => setSelectedSubject(subject)}
                  className={`w-full text-left p-2 rounded flex items-center justify-between ${
                    selectedSubject.id === subject.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                  }`}
                >
                  <div>
                    <div>{subject.name}</div>
                    <div className="text-sm text-gray-500">{subject.instructor}</div>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ))}
            </div>
          </Card>

          {/* Progress Overview */}
          <Card>
            <h2 className="font-semibold mb-4">My Progress</h2>
            {currentStudent.enrolledSubjects.map(subject => (
              <div key={subject.id} className="mb-4 last:mb-0">
                <div className="flex justify-between text-sm mb-1">
                  <span>{subject.name}</span>
                  <span>{subject.questionsSolved}/{subject.totalQuestions}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(subject.questionsSolved / subject.totalQuestions) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <Card>
            <h2 className="text-xl font-semibold mb-4">{selectedSubject.name}</h2>
            <TabSystem defaultTab="assignments">
              <Tab value="assignments" label="Assignments">
                <div className="space-y-4">
                  {assignments.map(assignment => (
                    <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{assignment.title}</h3>
                        <StatusBadge status={assignment.status} />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{assignment.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Due: {assignment.dueDate}</span>
                        <a
                          href={`https://leetcode.com/problems/${assignment.leetcodeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-500 hover:text-blue-600"
                        >
                          Solve on LeetCode
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    </Card>
                  ))}
                </div>
              </Tab>

              <Tab value="leaderboard" label="Leaderboard">
                <div className="space-y-4">
                  {[...classmates]
                    .sort((a, b) => b.questionsSolved - a.questionsSolved)
                    .map((student, index) => (
                      <div 
                        key={student.id} 
                        className={`flex items-center justify-between p-4 border rounded-lg ${
                          student.id === currentStudent.id ? 'bg-blue-50 border-blue-200' : ''
                        }`}
                      >
                        <div className="flex items-center">
                          {index === 0 && <Award className="w-6 h-6 text-yellow-500 mr-2" />}
                          <div>
                            <span className="font-medium">{student.name}</span>
                            {student.id === currentStudent.id && (
                              <span className="ml-2 text-sm text-blue-600">(You)</span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div>{student.questionsSolved} questions</div>
                          <div className="text-sm text-gray-500">Last active: {student.lastActive}</div>
                        </div>
                      </div>
                  ))}
                </div>
              </Tab>
            </TabSystem>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;