import React, { useEffect, useState } from 'react';
import VerifyToken from '../../utils/VerifyToken';

const ScheduledTasks = () => {
    const user = VerifyToken();
    const taskCreatedBy = user?.username; // Get the current user's username
    const [tasks, setTasks] = useState([]);

    // Fetch tasks on component mount
    useEffect(() => {
        fetch("https://lab-scheduler-server.vercel.app/scheduledtasks")
            .then((res) => res.json())
            .then((data) => {
                // Filter tasks created by the current user
                const filteredTasks = data.data.filter(task => task?.taskCratedBy === taskCreatedBy);
                setTasks(filteredTasks); // Set only tasks created by the current user
            });
    }, [taskCreatedBy]); // Use taskCreatedBy as a dependency to trigger useEffect when it changes

    // Function to format the date to a human-readable format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="h-screen mx-auto px-4 py-8">
            <h1 className="md:text-xs font-bold uppercase mb-6">Scheduled Tasks</h1>
            <div className="overflow-x-auto px-5">
                <table className="w-full border-collapse text-xs">
                    <thead className="text-sm bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left">
                                Task Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left">
                                Machine
                            </th>
                            <th scope="col" className="px-6 py-3 text-left">
                                Estimated time of completion
                            </th>
                            <th scope="col" className="px-6 py-3 text-left">
                                Scheduled date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left">
                                Scheduled time
                            </th>
                            <th scope="col" className="px-6 py-3 text-left">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Render tasks only for the current user */}
                        {tasks.length > 0 ? (
                            tasks.map((task) => (
                                <tr key={task?._id} className="bg-white border-b text-xs">
                                    <td className="px-6 py-4 text-left">
                                        {task?.taskName}
                                    </td>
                                    <td className="px-6 py-4 text-left">
                                        {task?.selectedMachine?.join(", ")}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {task?.estimatedTime || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {task?.startDate ? formatDate(task.startDate) : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {task?.selectedTimeSlots[0]}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {task?.approve === "Pending" ? "Pending" : task?.approve}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center px-6 py-4">
                                    No tasks available for {taskCreatedBy}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ScheduledTasks;
