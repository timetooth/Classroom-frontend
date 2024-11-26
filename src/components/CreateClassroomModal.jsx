import React, { useState } from 'react';
import Modal from '../components/Modal';

const endpoint = 'http://127.0.0.1:3000/classroom'

const CreateClassroomModal = ({ isOpen, onClose, onClassroomCreated }) => {
  const [newClassroomName, setNewClassroomName] = useState('');
  const [createdClassroomId, setCreatedClassroomId] = useState(null);

  const handleCreateClassroom = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name: newClassroomName }),
      });

      if (!response.ok) {
        throw new Error('Failed to create classroom');
      }

      const data = await response.json();
      setCreatedClassroomId(data.classroom.id);
      setNewClassroomName('');
      // Ensure the classroom has students and assignments arrays
      const newClassroom = {
        ...data.classroom,
        students: [],
        assignments: [],
      };
      // Pass the new classroom data back to the parent component
      onClassroomCreated(newClassroom);
    } catch (error) {
      console.error('Error creating classroom:', error);
    }
  };

  const handleCloseModal = () => {
    setNewClassroomName('');
    setCreatedClassroomId(null);
    onClose();
  };

  return isOpen ? (
    <Modal onClose={handleCloseModal}>
      {!createdClassroomId ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Create New Classroom</h2>
          <form onSubmit={handleCreateClassroom} className="space-y-4">
            <div>
              <label htmlFor="classroomName" className="block text-sm font-medium mb-1">
                Classroom Name
              </label>
              <input
                id="classroomName"
                type="text"
                value={newClassroomName}
                onChange={(e) => setNewClassroomName(e.target.value)}
                className="w-full p-2 border rounded"
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
                Create Classroom
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Classroom Created</h2>
          <p>Your classroom has been created successfully!</p>
          <p>
            <strong>Classroom ID:</strong> {createdClassroomId}
          </p>
          <p>You can share this ID with your students to let them join the classroom.</p>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              OK
            </button>
          </div>
        </>
      )}
    </Modal>
  ) : null;
};

export default CreateClassroomModal;
