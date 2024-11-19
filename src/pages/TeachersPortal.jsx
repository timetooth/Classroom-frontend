import React, { useState, useCallback } from 'react';
import { ChevronRight, Award, Users, BookOpen, X } from 'lucide-react';

// Custom Card Component
const Card = React.memo(({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-sm border p-4 ${className}`}>
    {children}
  </div>
));

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

// Modal Component
const Modal = React.memo(({ children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <X size={20} />
      </button>
      {children}
    </div>
  </div>
));

const TeachersPortal = () => {
  // Sample data - in real app, this would come from an API
  const [classes] = useState([
    {
      id: 1,
      name: 'Data Structures',
      students: [
        { id: 1, name: 'Alice Smith', questionsSolved: 15, lastActive: '2024-11-15' },
        { id: 2, name: 'Bob Johnson', questionsSolved: 12, lastActive: '2024-11-14' },
        { id: 3, name: 'Carol White', questionsSolved: 18, lastActive: '2024-11-16' },
      ],
      assignments: [
        { id: 1, title: 'Two Sum', leetcodeId: 1, dueDate: '2024-11-20' },
        { id: 2, title: 'Valid Parentheses', leetcodeId: 20, dueDate: '2024-11-25' },
      ]
    },
    {
      id: 2,
      name: 'Algorithms',
      students: [
        { id: 4, name: 'David Brown', questionsSolved: 20, lastActive: '2024-11-16' },
        { id: 5, name: 'Eve Davis', questionsSolved: 16, lastActive: '2024-11-15' },
      ],
      assignments: [
        { id: 3, title: 'Merge Sort', leetcodeId: 912, dueDate: '2024-11-22' },
      ]
    }
  ]);

  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [showNewAssignment, setShowNewAssignment] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    leetcodeId: '',
    dueDate: ''
  });

  // Handlers wrapped in useCallback to prevent unnecessary re-renders
  const handleClassSelect = useCallback((cls) => {
    setSelectedClass(cls);
  }, []);

  const handleShowNewAssignment = useCallback(() => {
    setShowNewAssignment(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowNewAssignment(false);
    // Optionally reset the form when closing the modal
    setNewAssignment({ title: '', leetcodeId: '', dueDate: '' });
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setNewAssignment(prevState => ({
      ...prevState,
      [name]: value
    }));
  }, []);

  const handleCreateAssignment = useCallback((e) => {
    e.preventDefault();
    // Validation can be added here
    const assignmentToAdd = {
      id: Date.now(), // Simple unique ID; replace with a proper method in production
      title: newAssignment.title,
      leetcodeId: newAssignment.leetcodeId ? Number(newAssignment.leetcodeId) : null,
      dueDate: newAssignment.dueDate
    };
    setSelectedClass(prevClass => ({
      ...prevClass,
      assignments: [...prevClass.assignments, assignmentToAdd]
    }));
    handleCloseModal();
  }, [newAssignment, handleCloseModal]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Teacher's Portal</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Classes Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <div className="flex items-center mb-4">
              <BookOpen className="w-4 h-4 mr-2" />
              <h2 className="font-semibold">My Classes</h2>
            </div>
            <div className="space-y-2">
              {classes.map(cls => (
                <button
                  key={cls.id}
                  onClick={() => handleClassSelect(cls)}
                  className={`w-full text-left p-2 rounded flex items-center justify-between ${
                    selectedClass.id === cls.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                  }`}
                >
                  {cls.name}
                  <ChevronRight className="w-4 h-4" />
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <Card>
            <h2 className="text-xl font-semibold mb-4">{selectedClass.name}</h2>
            <TabSystem defaultTab="students">
              <Tab value="students" label="Students">
                <div className="rounded-lg border">
                  <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b bg-gray-50">
                    <div>Name</div>
                    <div>Questions Solved</div>
                    <div>Last Active</div>
                    <div>Progress</div>
                  </div>
                  {selectedClass.students.map(student => (
                    <div key={student.id} className="grid grid-cols-4 gap-4 p-4 border-b last:border-b-0">
                      <div>{student.name}</div>
                      <div>{student.questionsSolved}</div>
                      <div>{student.lastActive}</div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div 
                          className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                          style={{ width: `${(student.questionsSolved / 20) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Tab>

              <Tab value="leaderboard" label="Leaderboard">
                <div className="space-y-4">
                  {[...selectedClass.students]
                    .sort((a, b) => b.questionsSolved - a.questionsSolved)
                    .map((student, index) => (
                      <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          {index === 0 && <Award className="w-6 h-6 text-yellow-500 mr-2" />}
                          <span className="font-medium">{student.name}</span>
                        </div>
                        <div>{student.questionsSolved} questions</div>
                      </div>
                  ))}
                </div>
              </Tab>

              <Tab value="assignments" label="Assignments">
                <div className="space-y-4">
                  {selectedClass.assignments.map(assignment => (
                    <Card key={assignment.id} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{assignment.title}</h3>
                        <p className="text-sm text-gray-500">LeetCode #{assignment.leetcodeId}</p>
                      </div>
                      <div className="text-sm">Due: {assignment.dueDate}</div>
                    </Card>
                  ))}
                  
                  <button 
                    onClick={handleShowNewAssignment}
                    className="w-full p-4 border-2 border-dashed rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400"
                  >
                    + Add New Assignment
                  </button>
                </div>
              </Tab>
            </TabSystem>
          </Card>
        </div>
      </div>

      {/* New Assignment Modal */}
      {showNewAssignment && (
        <Modal onClose={handleCloseModal}>
          <h2 className="text-xl font-semibold mb-4">New Assignment</h2>
          <form className="space-y-4" onSubmit={handleCreateAssignment}>
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                className="w-full p-2 border rounded"
                value={newAssignment.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="leetcodeId" className="block text-sm font-medium mb-1">LeetCode Problem ID</label>
              <input
                id="leetcodeId"
                name="leetcodeId"
                type="number"
                className="w-full p-2 border rounded"
                value={newAssignment.leetcodeId}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium mb-1">Due Date</label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                className="w-full p-2 border rounded"
                value={newAssignment.dueDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Create Assignment
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default TeachersPortal;
