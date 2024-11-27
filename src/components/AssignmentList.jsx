import React from "react";
import AssignmentCard from "./AssignmentCard";

const AssignmentList = ({
    assignments,
    completedAssignments,
    showDetails = true,
    isTeacher = false,
}) => (
    <div className="space-y-4">
        {assignments.map((assignment) => (
            <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                showDetails={showDetails}
                isComplete={
                    isTeacher || completedAssignments.includes(assignment.id)
                }
            />
        ))}
    </div>
);

export default AssignmentList;
