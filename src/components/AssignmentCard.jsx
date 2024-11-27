import React from "react";
import Card from "./Card";
import StatusBadge from "./StatusBadge";
import { ExternalLink, Check } from "lucide-react";
import { baseUrl } from "../constants";

const AssignmentCard = ({ assignment, showDetails = true }) => {
  const handleCompleteAssignment = async () => {
    try {
      const response = await fetch(`${baseUrl}/assignment/${assignment.id}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          assignmentId: assignment.id,
          userEmail: localStorage.getItem('userEmail'), // Adjust as needed
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
        <div className="flex items-center">
          {assignment.status && <StatusBadge status={assignment.status} />}
          {/* "Question Completed" Button as a Checkmark Icon */}
          <button
            onClick={handleCompleteAssignment}
            className="ml-2 text-green-500 hover:text-green-600"
            title="Mark as Completed"
          >
            <Check className="w-5 h-5" />
          </button>
        </div>
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
    </Card>
  );
};

export default AssignmentCard;
