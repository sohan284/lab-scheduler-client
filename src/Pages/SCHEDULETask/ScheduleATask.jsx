import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import { Select } from "antd";
import VerifyToken from "../../utils/VerifyToken";
import { Toaster, toast } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import TabNav from "../../Shared/TabNav";





const ScheduleATask = () => {
    const user = VerifyToken();
    const taskCratedBy = user?.username;

    const OPTIONS = [
        "Nilpeter Press",
        "Comco Press",
        "Sohn flexo machine",
        "New Press 2",
        "Nilpeter Press 3",
    ];
    const [startDate, setStartDate] = useState(new Date());
    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
    const [taskName, setTaskName] = useState("");
    const [course, setCourse] = useState("");
    const [email, setEmail] = useState("");
    const [selectedMachine, setSelectedMachine] = useState([]);
    const [scheduledTasks, setScheduledTasks] = useState([]);
    const filteredOptions = OPTIONS.filter((o) => !selectedMachine.includes(o));
    const [duration, setDuration] = useState("30 minutes");
    const [Loading, setLoading] = useState(false);

    const timeSlots = [
        "08:30", "08:45", "09:00", "09:15", "09:30",
        "09:45", "10:00", "10:15", "10:30", "10:45",
        "11:00", "11:15", "11:30", "11:45", "12:00",
        "12:15", "12:30", "12:45", "13:00", "13:15",
        "13:30", "13:45", "14:00", "14:15", "14:30",
        "14:45", "15:00", "15:15", "15:30", "15:45",
        "16:00", "16:15", "16:30", "16:45", "17:00",
        "17:15", "17:30", "17:45", "18:00", "18:15",
        "18:30", "18:45", "19:00",
    ];

    const durationMapping = {
        "15 minutes": 1,
        "30 minutes": 2,
        "45 minutes": 3,
        "1 hour": 4,
        "2 hours": 8,
        "3 hours": 12,
        "4 hours": 16,
        "5 hours": 20,
    };

    const formatDuration = (duration) => {
        const durationFormatMapping = {
            "15 minutes": "00:15",
            "30 minutes": "00:30",
            "45 minutes": "00:45",
            "1 hour": "01:00",
            "2 hours": "02:00",
            "3 hours": "03:00",
            "4 hours": "04:00",
            "5 hours": "05:00",
        };
        return durationFormatMapping[duration] || "00:00";
    };

    const handleTimeSlotClick = (slot) => {
        const selectedIndex = timeSlots.indexOf(slot);
        const durationInSlots = durationMapping[duration] || 0;
        const isConflict = isSlotBooked(slot, durationInSlots);
        if (isConflict) {
            toast.error(
                "The selected time slot overlaps with an already booked slot."
            );
            return;
        }
        const newSelectedSlots = [];
        for (let i = selectedIndex; i < selectedIndex + durationInSlots; i++) {
            if (i < timeSlots.length) {
                newSelectedSlots.push(timeSlots[i]);
            }
        }

        setSelectedTimeSlots(newSelectedSlots);
    };

    const isSlotBooked = (startSlot, durationInSlots) => {
        const startIndex = timeSlots.indexOf(startSlot);
        const endIndex = startIndex + durationInSlots - 1;

        return scheduledTasks.some((task) => {
            if (
                task.selectedMachine.some((machine) =>
                    selectedMachine.includes(machine)
                )
            ) {
                const bookedStartTime = new Date(task.startDate);
                const bookedTimeSlots = task.selectedTimeSlots;

                if (bookedStartTime.toDateString() === startDate.toDateString()) {
                    const taskStartIndex = timeSlots.indexOf(bookedTimeSlots[0]);
                    const taskEndIndex = taskStartIndex + bookedTimeSlots.length - 1;

                    if (
                        (startIndex >= taskStartIndex && startIndex <= taskEndIndex) ||
                        (endIndex >= taskStartIndex && endIndex <= taskEndIndex) ||
                        (startIndex <= taskStartIndex && endIndex >= taskEndIndex)
                    ) {
                        return true;
                    }
                }
            }
            return false;
        });
    };


    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (
            !taskName ||
            !course ||
            !duration ||
            selectedTimeSlots.length === 0 ||
            selectedMachine.length === 0
        ) {
            toast.error(
                "Please fill in all fields, select time slots, and choose at least one machine."
            );
            setLoading(false);
            return;
        }

        const formData = {
            taskName,
            course,
            startDate: startDate.toISOString(),
            selectedTimeSlots: selectedTimeSlots.length > 0 ? selectedTimeSlots : [],
            selectedMachine,
            email,
            estimatedTime: duration,
            approve: "Pending",
            taskCratedBy: taskCratedBy,
        };

        try {
            const response = await fetch(
                "https://lab-scheduler-server.vercel.app/scheduledtasks",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            console.log("Success:", result);
            toast.success("Task Sent to Faculty successfully! Wait for their Approval.");


            setTaskName("");
            setCourse("");
            setEmail("");
            setSelectedMachine([]);
            setSelectedTimeSlots([]);
            setStartDate(new Date());
            setDuration("30 minutes");
        } catch (error) {
            console.error("Error:", error);
            toast.error("There was a problem scheduling the task.");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const fetchScheduledTasks = async () => {
            try {
                const response = await fetch(
                    "https://lab-scheduler-server.vercel.app/scheduledtasks"
                );
                const data = await response.json();
                const approvedData = data.data.filter(
                    (item) => item.approve === "Approved"
                );
                setScheduledTasks(approvedData);
            } catch (error) {
                console.error("Error fetching scheduled tasks:", error);
            }
        };

        fetchScheduledTasks();
    }, []);

    return (
        <>

            <TabNav />
            <div className="max-w-[1200px] mx-auto mt-5 lg:p-6 bg-white rounded-lg">
                <Toaster position="top-center" reverseOrder={false} />

                {Loading && <Loader text={"Your Task is sending to faculty"} />}

                {!Loading && (
                    <div>
                        <h4 className="text-xl font-bold text-[#515151]">SCHEDULE A TASK</h4>
                        <div className="mt-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="flex items-center gap-20 lg:px-10">
                                    <label
                                        htmlFor="taskName"
                                        className="block font-medium text-xs min-w-[71px]"
                                    >
                                        Task Name
                                    </label>
                                    <input
                                        type="text"
                                        name="taskName"
                                        id="taskName"
                                        value={taskName}
                                        onChange={(e) => setTaskName(e.target.value)}
                                        className="border text-xs w-[235px] h-6 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="flex items-center gap-20 px-10 bg-[#FAFAFA] py-5">
                                    <label
                                        htmlFor="course"
                                        className="block font-medium text-xs min-w-[71px]"
                                    >
                                        Course
                                    </label>
                                    <input
                                        type="text"
                                        name="course"
                                        id="course"
                                        value={course}
                                        onChange={(e) => setCourse(e.target.value)}
                                        className="border text-xs w-[235px] h-6 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col relative w-fit">
                                    <div className="flex items-center gap-20 px-10">
                                        <label
                                            htmlFor="machine"
                                            className="block font-medium text-xs min-w-[71px]"
                                        >
                                            Machine
                                        </label>
                                        <Select
                                            mode="multiple"
                                            placeholder="Please select machines"
                                            value={selectedMachine}
                                            onChange={setSelectedMachine}
                                            style={{
                                                width: "400px",
                                                borderColor: selectedMachine.length === 0 ? "red" : undefined,
                                            }}
                                            options={filteredOptions.map((item) => ({
                                                value: item,
                                                label: item,
                                            }))}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 bg-[#FAFAFA] py-3  ">
                                    <div className="flex items-center gap-5  ">
                                        <label
                                            htmlFor="duration"
                                            className="block font-medium text-xs px-10"
                                        >
                                            Duration:
                                        </label>
                                        <select
                                            name="duration"
                                            id="duration"
                                            value={duration}
                                            onChange={(e) => setDuration(e.target.value)}
                                            className="border text-xs border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        >
                                            <option value="">Select Duration</option>
                                            <option value="15 minutes">15 minutes</option>
                                            <option selected="selected" value="30 minutes">
                                                30 minutes
                                            </option>
                                            <option value="45 minutes">45 minutes</option>
                                            <option value="1 hour">1 hour</option>
                                            <option value="2 hours">2 hours</option>
                                            <option value="3 hours">3 hours</option>
                                            <option value="4 hours">4 hours</option>
                                            <option value="5 hours">5 hours</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-5 bg-[#FAFAFA] ">
                                        <label
                                            htmlFor="estimatedTime"
                                            className=" flex items-center gap-5 font-medium text-xs px-10"
                                        >
                                            Estimate it for me <input type="checkbox" required name="" id="" />
                                        </label>
                                        <span
                                            className={`ml-2 text-xs ${selectedTimeSlots.length > 0 ? "text-blue-600" : "text-gray-500"
                                                }`}
                                        >
                                            {duration ? formatDuration(duration) : "00:00"}
                                        </span>
                                    </div>
                                </div>
                                <div className="lg:px-10 pt-6">
                                    <h2 className="text-xs font-semibold">Available Time Slot</h2>
                                    <div className="flex">
                                        <div className="flex-1 border-gray-300 rounded p-4 mt-2">
                                            <DatePicker
                                                selected={startDate}
                                                onChange={(date) => setStartDate(date)}
                                                inline
                                                minDate={new Date()}
                                                className="border-gray-300 rounded"
                                            />
                                        </div>
                                        <div className="flex-1 flex items-center justify-center relative">
                                            <div className="flex flex-col items-start gap-1 text-xs absolute -top-12 lg:left-16">
                                                <div className="flex gap-2">
                                                    <div className="h-4 w-4 bg-gray-400 rounded-md"></div>
                                                    <p> Scheduled by others</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <div className="h-4 w-4 bg-white border border-black rounded-md"></div>
                                                    <p> Available time slot</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-4 gap-3 place-items-center">
                                                {timeSlots.map((slot, index) => {
                                                    const isDisabled = isSlotBooked(slot);
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={`px-2 py-1 text-xs cursor-pointer rounded transition-all duration-200 
                                                        ${selectedTimeSlots.includes(slot)
                                                                    ? "bg-blue-200 text-black"
                                                                    : isDisabled
                                                                        ? "bg-gray-300 cursor-not-allowed"
                                                                        : "hover:bg-blue-300"
                                                                }`}
                                                            onClick={() => !isDisabled && handleTimeSlotClick(slot)}
                                                        >
                                                            {slot}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs">
                                                {startDate
                                                    ? startDate.toLocaleDateString(undefined, {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })
                                                    : "Date not available"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="flex items-center gap-4 bg-[#F2F4F6] px-10 py-5">
                                        <p>
                                            This machine requires faculty permission/availability. <br />{" "}
                                            Send for approval?
                                        </p>
                                        <input required type="checkbox" />
                                    </div>
                                    <div className="flex items-center gap-4 px-10 py-5">
                                        <p>I need a tutorial for this job</p>
                                        <input type="checkbox" />
                                    </div>
                                </div>
                                <div className="mt-4 px-10">
                                    <button
                                        type="submit"
                                        className="bg-[#522C80] text-white px-4 py-2 rounded shadow text-xs hover:bg-[#754da7] transition"
                                    >
                                        SCHEDULE
                                    </button>
                                </div>
                            </form>
                            <div className="mt-4 flex flex-col w-fit gap-5 px-10">
                                <p className="border-b w-fit">Share</p>
                                <div className="flex gap-5">
                                    <p className="ml-10">Type email:</p> <input className="border text-xs w-[235px] h-6 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-[#522C80] text-white px-4 py-2 w-fit rounded shadow text-xs hover:bg-[#754da7] transition"
                                >
                                    SHARE
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ScheduleATask;
