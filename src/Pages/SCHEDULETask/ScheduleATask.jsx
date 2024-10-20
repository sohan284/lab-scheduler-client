import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import default styles
import './styles.css'; // Import custom styles

const ScheduleATask = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [taskName, setTaskName] = useState('');
    const [course, setCourse] = useState('');
    const [machine, setMachine] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [estimateCheckbox, setEstimateCheckbox] = useState(false);
    const [email, setEmail] = useState('');

    const timeSlots = [
        '08:30', '08:45', '09:00', '09:15', '09:30', '09:45',
        '10:00', '10:15', '10:30', '10:45', '11:00', '11:15',
        '11:30', '11:45', '12:00', '12:15', '12:30', '12:45',
        '13:00', '13:15', '13:30', '13:45', '14:00', '14:15',
        '14:30', '14:45', '15:00', '15:15', '15:30', '15:45',
        '16:00', '16:15', '16:30', '16:45', '17:00', '17:15',
        '17:30', '17:45', '18:00', '18:15', '18:30', '18:45',
        '19:00'
    ];

    const handleTimeSlotClick = (slot) => {
        setSelectedTimeSlot(slot);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare the data for API
        const formData = {
            taskName,
            course,
            machine,
            estimatedTime,
            startDate,
            selectedTimeSlot,
            estimateCheckbox,
            email,
        };

        console.log(formData);
        // Here you would send `formData` to your API

        // Optionally reset the form
        // resetForm();
    };

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formatEstimatedTime = (time) => {
        if (!time) return '00:00:00';

        const parts = time.split(' '); // Split into value and unit
        const value = parseInt(parts[0], 10); // Get the numeric value
        const unit = parts[1]; // Get the unit (minutes or hours)

        let hours = 0;
        let minutes = 0;

        if (unit === 'minutes') {
            minutes = value;
        } else if (unit === 'hour' || unit === 'hours') {
            hours = value;
        }
        if (minutes >= 60) {
            hours += Math.floor(minutes / 60);
            minutes = minutes % 60;
        }
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
    };

    return (
        <div className='container mx-auto mt-5 p-6 bg-white shadow-md rounded-lg'>
            <h4 className='text-xl font-bold text-[#515151]'>SCHEDULE A TASK</h4>
            <div className='px-6 mt-6'>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Task Name */}
                    <div>
                        <label htmlFor="taskName" className="block font-medium text-lg">Task Name</label>
                        <input
                            type="text"
                            name='taskName'
                            id="taskName"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    {/* Course */}
                    <div>
                        <label htmlFor="course" className="block font-medium text-lg">Course</label>
                        <input
                            type="text"
                            name='course'
                            id="course"
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    {/* Machine */}
                    <div>
                        <label htmlFor="machine" className="block font-medium text-lg">Machine</label>
                        <input
                            type="text"
                            name='machine'
                            id="machine"
                            value={machine}
                            onChange={(e) => setMachine(e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button type="button" className="mt-2 text-blue-500 hover:underline">+ Add more</button>
                    </div>
                    {/* Estimated Time */}
                    <div className='flex items-center gap-5'>
                        <label htmlFor="estimatedTime" className="block font-medium text-lg">Estimated Time Required:</label>
                        <select
                            name='estimatedTime'
                            id="estimatedTime"
                            value={estimatedTime}
                            onChange={(e) => setEstimatedTime(e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Time</option>
                            <option value="30 minutes">30 minutes</option>
                            <option value="1 hour">1 hour</option>
                            <option value="2 hours">2 hours</option>
                            <option value="3 hours">3 hours</option>
                            <option value="4 hours">4 hours</option>
                            <option value="5 hours">5 hours</option>
                        </select>
                    </div>
                    {/* Estimate Checkbox */}
                    <div className='flex items-center gap-10'>
                        <div className='flex items-center gap-5'>
                            <p className='text-lg'>Estimate it for me</p>
                            <input
                                type="checkbox"
                                checked={estimateCheckbox}
                                onChange={(e) => setEstimateCheckbox(e.target.checked)}
                                className="focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <p>{formatEstimatedTime(estimatedTime)}</p>
                    </div>
                    {/* Date and Time Slots */}
                    <div>
                        <h2 className='text-lg font-semibold'>Available Time Slot</h2>
                        <div className='flex'>
                            <div className='flex-1 border-gray-300 rounded p-4 mt-2'>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    inline
                                    minDate={new Date()}
                                    className="border border-gray-300 rounded w-full"
                                />
                            </div>
                            <div className='flex-1 flex items-center justify-center'>
                                <div className='grid grid-cols-4 gap-3 place-items-center'>
                                    {timeSlots.map((slot, index) => (
                                        <div
                                            key={index}
                                            className={`text-base cursor-pointer rounded transition-all duration-200 
                                            ${selectedTimeSlot === slot ? 'bg-blue-200 text-black' : 'hover:bg-blue-300'}`}
                                            onClick={() => handleTimeSlotClick(slot)}
                                        >
                                            {slot}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1">
                                <p>{startDate ? startDate.toLocaleDateString(undefined, options) : 'Date not available'}</p>
                            </div>
                        </div>
                    </div>
                    {/* Additional Checkboxes */}
                    <div>
                        <div className="flex items-center gap-4">
                            <p>This machine requires faculty permission/availability. Send for approval?</p>
                            <input type="checkbox" />
                        </div>
                        <div className="flex items-center gap-4">
                            <p>I need a tutorial for this job</p>
                            <input type="checkbox" />
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div className="mt-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition">SCHEDULE</button>
                    </div>
                </form>
                <p className="mt-6 text-lg font-semibold">Share</p>
                <div className="flex items-center mt-2">
                    <p>Type email:</p>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        className="border border-gray-300 rounded p-2 ml-2" 
                    />
                    <button className="ml-2 bg-blue-500 text-white px-3 py-1 rounded">+Add More</button>
                </div>
                <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition">SHARE</button>
            </div>
        </div>
    );
};

export default ScheduleATask;
