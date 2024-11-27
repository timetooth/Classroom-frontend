import React from "react";
import Card from "./Card";
import StatusBadge from "./StatusBadge";
import { ExternalLink } from "lucide-react";
import { baseUrl } from "../constants";

const AssignmentCard = ({ assignment, showDetails = true }) => {
  const handleCompleteAssignment = async () => {
    try {
      const response = await fetch(`${baseUrl}/assignment/:id/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
            assignmentId: assignment.id,
            userEmail: localStorage.getItem('userEmail'), // Replace with how you store user email
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to mark assignment as completed');
      }

      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error('Error completing assignment:', error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">{assignment.title}</h3>
        {assignment.status && <StatusBadge status={assignment.status} />}
      </div>
      {showDetails && assignment.description && (
        <p className="text-sm text-gray-600 mb-2">{assignment.description}</p>
      )}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">
          Due: {new Date(assignment.dueDate).toLocaleDateString()}
        </span>
        {assignment.link && (
          <a
            href={assignment.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-500 hover:text-blue-600"
          >
            {showDetails ? "Solve on LeetCode" : "View Problem"}
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        )}
      </div>
      {/* "Question Completed" Button */}
      <button
        onClick={handleCompleteAssignment}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Question Completed
      </button>
    </Card>
  );
};

export default AssignmentCard;
