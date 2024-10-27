import React, { useEffect, useState } from "react";
import VerifyToken from "../../utils/VerifyToken";
import Loader from "../../components/Loader/Loader";
import TabNav from "../../Shared/TabNav";

const AddedTasks = () => {
  const user = VerifyToken();
  const taskCreatedBy = user?.username; // Ensure this is correct based on your token
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/scheduledtasks")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);

        // Filter the tasks based on taskCratedBy and approve field
        const filteredTasks = data.data.filter(
          (task) =>
            task?.taskCratedBy === taskCreatedBy && task?.approve === "Approved"
        );
        console.log(filteredTasks);

        setTasks(filteredTasks);
        setLoading(false);
      });
  }, [taskCreatedBy]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <TabNav />
      <div className="px-4 py-10 text-xs">
        <h1 className="  font-bold uppercase mb-6">Scheduled Tasks</h1>
        {loading ? (
          <Loader text={"Collecting Your Data"} />
        ) : (
          <div>
            {tasks.length > 0 ? (
              <div className="   ">
                {tasks.map((task, index) => (
                  <div key={index} className="flex justify-between mb-10 border-b-2 border-dashed border-gray-300">
                    <div className="w-1/2">
                      <h1 className="py-4 px-10 font-bold">Task Name</h1>
                      <h1 className="bg-zinc-50 py-4 px-10">Machine</h1>
                      <h1 className="py-4 px-10">
                        Estimated time required to finish the task
                      </h1>
                      <h1 className="bg-zinc-50 py-4 px-10 font-bold">
                        Available time slot
                      </h1>
                      <h1 className="py-4 px-10">
                        This machine requires faculty permission/availability.
                      </h1>
                      <button className="py-4 px-10 underline underline-offset-4">
                        Tutorial
                      </button>
                      <button className="block py-4 px-10 underline underline-offset-4">
                        Share
                      </button>
                    </div>
                    <div className="w-1/2">
                      <p className="py-4 px-10">{task.taskName}</p>
                      <p className="bg-zinc-50 py-4 px-10">
                        {task.selectedMachine.join(", ")}
                      </p>
                      <p className="py-4 px-10">{task.estimatedTime}</p>
                      <p className="bg-zinc-50 py-4 px-10 font-bold">
                        {task?.startDate
                          ? `${formatDate(task.startDate)}, ${task.selectedTimeSlots[0]
                          }`
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-600 font-bold">No Task Approved</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AddedTasks;
