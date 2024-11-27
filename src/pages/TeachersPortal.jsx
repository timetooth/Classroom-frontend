import React, { useState, useCallback, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import TabSystem from "../components/TabSystem";
import Tab from "../components/Tab";
import AssignmentList from "../components/AssignmentList";
import Leaderboard from "../components/Leaderboard";
import Modal from "../components/Modal";
import StudentsTable from "../components/StudentsTable";
import Card from "../components/Card";
import { BookOpen } from "lucide-react";
import CreateClassroomModal from "../components/CreateClassroomModal";
import { jwtDecode } from "jwt-decode";
import { baseUrl } from "../constants";

const TeachersPortal = () => {
    const [currentTeacher] = useState({
        name: jwtDecode(localStorage.getItem("token")).name,
    });

    const [classes, setClasses] = useState([
        // {
        //     id: 1,
        //     name: "Data Structures",
        //     students: [
        //         {
        //             id: 1,
        //             name: "Alice Smith",
        //             assignmentsCompleted: 15,
        //             lastActive: "2024-11-15",
        //         },
        //         {
        //             id: 2,
        //             name: "Bob Johnson",
        //             assignmentsCompleted: 12,
        //             lastActive: "2024-11-14",
        //         },
        //         {
        //             id: 3,
        //             name: "Carol White",
        //             assignmentsCompleted: 18,
        //             lastActive: "2024-11-16",
        //         },
        //     ],
        //     assignments: [
        //         {
        //             id: 1,
        //             title: "Two Sum",
        //             link: 1,
        //             dueDate: "2024-11-20",
        //         },
        //         {
        //             id: 2,
        //             title: "Valid Parentheses",
        //             link: 20,
        //             dueDate: "2024-11-25",
        //         },
        //     ],
        // },
        // {
        //     id: 2,
        //     name: "Algorithms",
        //     students: [
        //         {
        //             id: 4,
        //             name: "David Brown",
        //             assignmentsCompleted: 20,
        //             lastActive: "2024-11-16",
        //         },
        //         {
        //             id: 5,
        //             name: "Eve Davis",
        //             assignmentsCompleted: 16,
        //             lastActive: "2024-11-15",
        //         },
        //     ],
        //     assignments: [
        //         {
        //             id: 3,
        //             title: "Merge Sort",
        //             link: 912,
        //             dueDate: "2024-11-22",
        //         },
        //     ],
        // },
    ]);

    useEffect(() => {
        // Fetch the classes for the current teacher
        fetch(`${baseUrl}/classroom/teacher`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setClasses(data.classrooms);
            });
    }, []);

    const [selectedClass, setSelectedClass] = useState(classes[0] || {});
    const [showNewAssignment, setShowNewAssignment] = useState(false);
    const [newAssignment, setNewAssignment] = useState({
        title: "",
        link: "",
        dueDate: "",
    });

    const [showCreateClassroomModal, setShowCreateClassroomModal] =
        useState(false);

    const handleClassSelect = useCallback((cls) => {
        setSelectedClass(cls);
    }, []);

    const handleShowCreateClassroomModal = () => {
        setShowCreateClassroomModal(true);
    };

    const handleCloseCreateClassroomModal = () => {
        setShowCreateClassroomModal(false);
    };

    const handleClassroomCreated = (newClassroom) => {
        // Add the created classroom to the list of classes
        setClasses((prevClasses) => [...prevClasses, newClassroom]);
    };

    const handleShowNewAssignment = useCallback(() => {
        setShowNewAssignment(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setShowNewAssignment(false);
        setNewAssignment({ title: "", link: "", dueDate: "" });
    }, []);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setNewAssignment((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }, []);

    const handleCreateAssignment = useCallback(
        (e) => {
            e.preventDefault();
            const assignmentToAdd = {
                id: Date.now(),
                title: newAssignment.title,
                link: newAssignment.link ? newAssignment.link : null,
                dueDate: newAssignment.dueDate,
            };
            // Update the selected class's assignments
            setSelectedClass((prevClass) => ({
                ...prevClass,
                assignments: [
                    ...(prevClass.assignments || []),
                    assignmentToAdd,
                ],
            }));

            // Add the assignment to the backend
            fetch(`${baseUrl}/assignment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    title: newAssignment.title,
                    link: newAssignment.link,
                    description: "",
                    classroomId: selectedClass.id,
                    // Format due date
                    dueDate: newAssignment.dueDate,
                }),
            });

            handleCloseModal();
        },
        [newAssignment, handleCloseModal]
    );

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <Header title="Teacher Portal">
                <div className="text-right">
                    <h2 className="font-medium">{currentTeacher.name}</h2>
                    <a
                        href="/"
                        style={{ color: "#ff0000" }}
                        onClick={() => {
                            localStorage.removeItem("token");
                        }}
                    >
                        Logout
                    </a>
                </div>
            </Header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="md:col-span-1">
                    <Sidebar
                        title="My Classes"
                        icon={BookOpen}
                        items={classes}
                        selectedItem={selectedClass}
                        onSelectItem={handleClassSelect}
                        itemRenderer={(cls) => cls.name}
                    />
                    <button
                        onClick={handleShowCreateClassroomModal}
                        className="w-full p-4 border-2 border-dashed rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 mt-4"
                    >
                        + Create New Classroom
                    </button>
                </div>

                {/* Main Content */}
                <div className="md:col-span-3">
                    <Card>
                        <h2 className="text-xl font-semibold mb-4">
                            {(selectedClass &&
                                `${selectedClass.name} (ID: ${selectedClass.id})`) ||
                                "Please select a class"}
                        </h2>
                        <TabSystem defaultTab="students">
                            <Tab value="students" label="Students">
                                <StudentsTable
                                    students={
                                        selectedClass && selectedClass.students
                                    }
                                    assignmentCount={
                                        selectedClass &&
                                        selectedClass.assignments
                                            ? selectedClass.assignments.length
                                            : 0
                                    }
                                />
                            </Tab>

                            <Tab value="leaderboard" label="Leaderboard">
                                <Leaderboard
                                    classmates={
                                        selectedClass && selectedClass.students
                                    }
                                />
                            </Tab>

                            <Tab value="assignments" label="Assignments">
                                <div className="space-y-4">
                                    <AssignmentList
                                        assignments={
                                            selectedClass &&
                                            selectedClass.assignments
                                        }
                                        showDetails={false}
                                    />
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

            {/* Create Classroom Modal */}
            <CreateClassroomModal
                isOpen={showCreateClassroomModal}
                onClose={handleCloseCreateClassroomModal}
                onClassroomCreated={handleClassroomCreated}
            />

            {/* New Assignment Modal */}
            {showNewAssignment && (
                <Modal onClose={handleCloseModal}>
                    <h2 className="text-xl font-semibold mb-4">
                        New Assignment
                    </h2>
                    <form
                        className="space-y-4"
                        onSubmit={handleCreateAssignment}
                    >
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium mb-1"
                            >
                                Title
                            </label>
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
                            <label
                                htmlFor="link"
                                className="block text-sm font-medium mb-1"
                            >
                                LeetCode Problem Url
                            </label>
                            <input
                                id="link"
                                name="link"
                                type="link"
                                className="w-full p-2 border rounded"
                                value={newAssignment.link}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="dueDate"
                                className="block text-sm font-medium mb-1"
                            >
                                Due Date
                            </label>
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
