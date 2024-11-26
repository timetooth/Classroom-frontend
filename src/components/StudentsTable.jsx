import React from 'react';

const StudentsTable = ({ students }) => (
  <div className="rounded-lg border">
    <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b bg-gray-50">
      <div>Name</div>
      <div>Questions Solved</div>
      <div>Last Active</div>
      <div>Progress</div>
    </div>
    {students.map((student) => (
      <div
        key={student.id}
        className="grid grid-cols-4 gap-4 p-4 border-b last:border-b-0"
      >
        <div>{student.name}</div>
        <div>{student.questionsSolved}</div>
        <div>{student.lastActive}</div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-300"
            style={{
              width: `${(student.questionsSolved / 20) * 100}%`,
            }}
          />
        </div>
      </div>
    ))}
  </div>
);

export default StudentsTable;
