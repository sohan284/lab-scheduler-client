import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import VerifyToken from '../../utils/VerifyToken';

const ScheduledTasks = () => {
    const user = VerifyToken();
    const taskCreatedBy = user?.username;
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        fetch("https://lab-scheduler-server.vercel.app/scheduledtasks")

            .then((res) => res.json())
            .then((data) => {
                const filteredTasks = data.data.filter(task => task?.taskCratedBy === taskCreatedBy);
                setTasks(filteredTasks);
                setLoading(false)
            });
    }, [taskCreatedBy]);


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
                {
                    loading ? <div className=''>
                        <Loader />
                    </div> : <table className="w-full border-collapse text-xs">
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
                                            <p className={`${task?.approve === "Pending" && "bg-purple-600 text-white rounded-xl"} ${task?.approve === "Approved" && "bg-green-600 text-white rounded-xl"} ${task?.approve === "Rejected" && "bg-red-600 text-white rounded-xl"}`}> {task?.approve === "Pending" ? "Pending" : task?.approve}</p>
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
                }
            </div>
        </div>
    );
};

export default ScheduledTasks;
