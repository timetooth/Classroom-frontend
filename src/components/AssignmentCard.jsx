import React from "react";
import Card from "./Card";
import StatusBadge from "./StatusBadge";
import { ExternalLink } from "lucide-react";

const AssignmentCard = ({ assignment, showDetails = true }) => (
    <Card className="hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">{assignment.title}</h3>
            {assignment.status && <StatusBadge status={assignment.status} />}
        </div>
        {showDetails && assignment.description && (
            <p className="text-sm text-gray-600 mb-2">
                {assignment.description}
            </p>
        )}
        <div className="flex items-center justify-between text-sm">
            {/* Parse date to readable format before displaying */}
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

export default AssignmentCard;
