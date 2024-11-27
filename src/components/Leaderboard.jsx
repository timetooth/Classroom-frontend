import React from "react";
import { Award } from "lucide-react";

const Leaderboard = ({ classmates, currentStudent }) => (
    <div className="space-y-4">
        {[...classmates]
            .sort((a, b) => b.assignmentsCompleted - a.assignmentsCompleted)
            .map((student, index) => (
                <div
                    key={student.rollNumber}
                    className={`flex items-center justify-between p-4 border rounded-lg ${
                        currentStudent &&
                        student.rollNumber == currentStudent.rollNumber
                            ? "bg-blue-50 border-blue-200"
                            : ""
                    }`}
                >
                    <div className="flex items-center">
                        {index === 0 && (
                            <Award className="w-6 h-6 text-yellow-500 mr-2" />
                        )}
                        <div>
                            <span className="font-medium">{`${student.name} (${student.rollNumber})`}</span>
                            {currentStudent &&
                                student.rollNumber ==
                                    currentStudent.rollNumber && (
                                    <span className="ml-2 text-sm text-blue-600">
                                        (You)
                                    </span>
                                )}
                        </div>
                    </div>
                    <div className="text-right">
                        <div>{student.assignmentsCompleted} assignments</div>
                        {student.lastActive && (
                            <div className="text-sm text-gray-500">
                                Last active: {student.lastActive}
                            </div>
                        )}
                    </div>
                </div>
            ))}
    </div>
);

export default Leaderboard;
