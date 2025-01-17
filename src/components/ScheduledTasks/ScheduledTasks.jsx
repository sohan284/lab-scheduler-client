import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import VerifyToken from "../../utils/VerifyToken";
import baseUrl from "../../api/apiConfig";
import AuthToken from "../../utils/AuthToken";

const ScheduledTasks = () => {
  const user = VerifyToken();
  const createdBy = user?.username;
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = AuthToken();

  useEffect(() => {
    fetch(`${baseUrl.scheduledtasks}?username=${createdBy}`, {
      method: 'GET', // Optional, as GET is the default
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setTasks(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching scheduled tasks:', error);
        setLoading(false);
      });
  }, [createdBy, token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="h-screen mx-auto px-4 py-8">
      <h1 className="md:text-[15px] text-xl font-bold uppercase mb-6">
        Scheduled Tasks
      </h1>
      <div className="overflow-x-auto px-5">
        {loading ? (
          <div className="">
            <Loader text={"Getting Data"} />
          </div>
        ) : (
          <table className="w-full text-center border-collapse text-[15px]">
            <thead className="text-[15px] bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Task Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Machine
                </th>
                <th scope="col" className="px-6 py-3">
                  Estimated time of completion
                </th>
                <th scope="col" className="px-6 py-3">
                  Scheduled date
                </th>
                <th scope="col" className="px-6 py-3">
                  Scheduled time
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Render tasks only for the current user */}
              {tasks?.length > 0 ? (
                tasks?.map((task) => (
                  <tr key={task?._id} className="bg-white border-b text-[15px]">
                    <td className="px-6 py-4 text-left">{task?.taskName}</td>
                    <td className="px-6 py-4 text-left">
                    <p className="py-4 px-10">
                          {task.selectedMachine.map(machine => machine).join(", ")}
                        </p>
</td>
                    <td className="px-6 py-4 text-center">
                      {task?.estimatedTime || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {task?.startDate ? formatDate(task.startDate) : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {task?.selectedTimeSlots[0]}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <p
                     className={`text-nowrap px-2 p-0.5 ${
                      task?.approve === "Pending"
                        ? "bg-red-600 text-white rounded-xl"
                        : task?.approve === "Approved"
                        ? "bg-green-600 text-white rounded-xl"
                        : task?.approve === "Rejected"
                        ? "bg-pink-600 text-white rounded-xl"
                        : "bg-blue-500 text-white rounded-xl"
                    }`}
                    
                      >
                        {" "}
                        {task?.approve === "Pending"
                          ? "In Progress"
                          : task?.approve === "Approved"
                          ? "Scheduled" 
                          : task?.approve === "Rejected"
                          ? "Rejected"
                          : "Completed"}
                      </p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center  px-6 py-40">
                    No tasks available for {createdBy}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ScheduledTasks;
