import React from 'react';
import AssignmentCard from './AssignmentCard';

const AssignmentList = ({ assignments, showDetails = true }) => (
  <div className="space-y-4">
    {assignments.map((assignment) => (
      <AssignmentCard
        key={assignment.id}
        assignment={assignment}
        showDetails={showDetails}
      />
    ))}
  </div>
);

export default AssignmentList;
