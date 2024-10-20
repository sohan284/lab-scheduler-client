import React from 'react';

const ScheduledTasks = () => {
    const tasks = [
        { id: 1, name: 'Screen printing', machine: '-', estimatedTime: '2 hours', scheduledDate: 'October 20, 2024', scheduledTime: '13:00' },
        { id: 2, name: 'Flexo Printing', machine: 'Nilpeter Press', estimatedTime: '2 hours', scheduledDate: 'October 22, 2024', scheduledTime: '14:00' },
        { id: 3, name: 'Flexo printing', machine: 'Comco Press', estimatedTime: '2 hours', scheduledDate: 'October 22, 2024', scheduledTime: '10:00' },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className='text-xl font-bold uppercase mb-6'>Scheduled Tasks</h1>
            <div className="overflow-x-auto px-5">
                <table className="w-full border-collapse">
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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.map(task => (
                                <tr key={task.id} className="bg-white border-b">
                                    <td className="px-6 py-4">
                                        {task.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {task.machine}
                                    </td>
                                    <td className="px-6 py-4">
                                        {task.estimatedTime}
                                    </td>
                                    <td className="px-6 py-4">
                                        {task.scheduledDate}
                                    </td>
                                    <td className="px-6 py-4">
                                        {task.scheduledTime}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ScheduledTasks;
