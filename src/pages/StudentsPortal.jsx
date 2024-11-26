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
  const baseurl = 'http://127.0.0.1:3000';

  const [currentStudent] = useState({
    id: 1,
    name: 'Keshav Singla',
  });

  const [enrolledSubjects, setEnrolledSubjects] = useState([
    {
      id: 1,
      name: 'Data Structures',
      questionsSolved: 15,
      totalQuestions: 20,
    },
    {
      id: 2,
      name: 'Algorithms',
      questionsSolved: 8,
      totalQuestions: 15,
    },
  ]);

  const [selectedSubject, setSelectedSubject] = useState(enrolledSubjects[0]);

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
    },
  ]);

  const [classmates] = useState([
    {
      id: 1,
      name: 'Keshav Singla',
      questionsSolved: 15,
      lastActive: '2024-11-15',
    },
    {
      id: 2,
      name: 'Liza Garg',
      questionsSolved: 12,
      lastActive: '2024-11-14',
    },
    {
      id: 3,
      name: 'Ankit Gupta',
      questionsSolved: 18,
      lastActive: '2024-11-16',
    },
    {
      id: 4,
      name: 'Kay Singh',
      questionsSolved: 10,
      lastActive: '2024-11-16',
    },
  ]);

  // State for showing join classroom form
  const [showJoinClassroomForm, setShowJoinClassroomForm] = useState(false);
  const [newClassroomId, setNewClassroomId] = useState('');

  const handleJoinClassroom = async (e) => {
    e.preventDefault();

    const endpoint = `${baseurl}/classroom/${newClassroomId}/join`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to join classroom');
      }

      // Fetch the classroom details
      const classroomResponse = await fetch(`${baseurl}/classroom/${newClassroomId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!classroomResponse.ok) {
        throw new Error('Failed to fetch classroom details');
      }

      const classroomData = await classroomResponse.json();

      const newClassroom = {
        id: classroomData.classroom.id,
        name: classroomData.classroom.name,
        questionsSolved: 0,
        totalQuestions: 20,
      }

      // Update enrolledSubjects
      setEnrolledSubjects((prevSubjects) => [...prevSubjects, newClassroom]);

      // Optionally, set the new classroom as the selectedSubject
      setSelectedSubject(classroomData);

      setShowJoinClassroomForm(false);
      setNewClassroomId('');
    } catch (error) {
      console.error('Error joining classroom:', error);
      // You can display an error message to the user here
    }
  };

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
            items={enrolledSubjects}
            selectedItem={selectedSubject}
            onSelectItem={setSelectedSubject}
            itemRenderer={(subject) => (
              <div>
                <div>{subject.name}</div>
                <div className="text-sm text-gray-500">{subject.instructor || 'Instructor'}</div>
              </div>
            )}
          />

          {/* Join Classroom Button */}
          <button
            onClick={() => setShowJoinClassroomForm(true)}
            className="w-full p-4 border-2 border-dashed rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 mt-4"
          >
            + Join Classroom
          </button>

          {/* Join Classroom Form */}
          {showJoinClassroomForm && (
            <div className="p-4 border rounded-lg mt-4">
              <h3 className="text-lg font-semibold mb-2">Join Classroom</h3>
              <form onSubmit={handleJoinClassroom}>
                <div className="mb-2">
                  <label htmlFor="classroomId" className="block text-sm font-medium mb-1">
                    Classroom ID
                  </label>
                  <input
                    id="classroomId"
                    type="text"
                    value={newClassroomId}
                    onChange={(e) => setNewClassroomId(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowJoinClassroomForm(false);
                      setNewClassroomId('');
                    }}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Join
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Progress Overview */}
          <ProgressOverview subjects={enrolledSubjects} />
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <Card>
            <h2 className="text-xl font-semibold mb-4">{selectedSubject.name}</h2>
            <TabSystem defaultTab="assignments">
              <Tab value="assignments" label="Assignments">
                <AssignmentList assignments={assignments} />
              </Tab>
              <Tab value="leaderboard" label="Leaderboard">
                <Leaderboard classmates={classmates} currentStudent={currentStudent} />
              </Tab>
            </TabSystem>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;
