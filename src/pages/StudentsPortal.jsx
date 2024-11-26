import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ProgressOverview from '../components/ProgressOverview';
import TabSystem from '../components/TabSystem';
import Tab from '../components/Tab';
import AssignmentList from '../components/AssignmentList';
import Leaderboard from '../components/Leaderboard';
import Card from '../components/Card';
import { BookOpen } from 'lucide-react';

const StudentPortal = () => {
  const [currentStudent] = useState({
    id: 1,
    name: 'Keshav Singla',
    enrolledSubjects: [
      {id: 1, name: 'Data Structures',instructor: 'Dr. Garvit Gulati',questionsSolved: 15,totalQuestions: 20,},
      {id: 2, name: 'Algorithms',instructor: 'Dr. Ishita',questionsSolved: 8,totalQuestions: 15,},
    ],
  });

  const [selectedSubject, setSelectedSubject] = useState(
    currentStudent.enrolledSubjects[0]
  );

  const [assignments] = useState([
    {id: 1, title: 'Two Sum',leetcodeId: 1,dueDate: '2024-11-20',status: 'completed',description: 'Solve the Two Sum problem using optimal approach',},
    {id: 2, title: 'Valid Parentheses',leetcodeId: 20,dueDate: '2024-11-25',status: 'pending',description: 'Implement a solution for valid parentheses checking',},
    {id: 3, title: 'Merge Sort',leetcodeId: 912,dueDate: '2024-11-15',status: 'overdue',description: 'Implement merge sort algorithm',},
  ]);

  const [classmates] = useState([
    {id: 1,name: 'Keshav Singla',questionsSolved: 15,lastActive: '2024-11-15',},
    {id: 2,name: 'Liza Garg',questionsSolved: 12,lastActive: '2024-11-14',},
    {id: 3, name: 'Ankit Gupta',questionsSolved: 18,lastActive: '2024-11-16',},
    {id: 4, name: 'Kay Singh',questionsSolved: 10,lastActive: '2024-11-16',},
  ]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Header title="Student Portal">
        <div className="text-right">
          <h2 className="font-medium">{currentStudent.name}</h2>
          <p className="text-sm text-gray-500">Student ID: {currentStudent.id}</p>
        </div>
      </Header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-4">
          <Sidebar
            title="My Subjects"
            icon={BookOpen}
            items={currentStudent.enrolledSubjects}
            selectedItem={selectedSubject}
            onSelectItem={setSelectedSubject}
            itemRenderer={(subject) => (
              <div>
                <div>{subject.name}</div>
                <div className="text-sm text-gray-500">{subject.instructor}</div>
              </div>
            )}
          />

          {/* Progress Overview */}
          <ProgressOverview subjects={currentStudent.enrolledSubjects} />
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <Card>
            <h2 className="text-xl font-semibold mb-4">
              {selectedSubject.name}
            </h2>
            <TabSystem defaultTab="assignments">
              <Tab value="assignments" label="Assignments">
                <AssignmentList assignments={assignments} />
              </Tab>
              <Tab value="leaderboard" label="Leaderboard">
                <Leaderboard
                  classmates={classmates}
                  currentStudent={currentStudent}
                />
              </Tab>
            </TabSystem>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;
