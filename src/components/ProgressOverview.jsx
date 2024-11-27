import React from "react";
import Card from "./Card";

const ProgressOverview = ({ subjects }) => (
    <Card>
        <h2 className="font-semibold mb-4">My Progress</h2>
        {subjects.map((subject) => (
            <div key={subject.id} className="mb-4 last:mb-0">
                <div className="flex justify-between text-sm mb-1">
                    <span>{subject.name}</span>
                    <span>
                        {subject.totalCompletedAssignments}/
                        {subject.totalAssignments}
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{
                            width: `${
                                (subject.totalCompletedAssignments /
                                    subject.totalAssignments) *
                                100
                            }%`,
                        }}
                    />
                </div>
            </div>
        ))}
    </Card>
);

export default ProgressOverview;
