import React, { useEffect, useState } from "react";
import VerifyToken from "../../utils/VerifyToken";
import Loader from "../../components/Loader/Loader";
import TabNav from "../../Shared/TabNav";
import baseUrl from "../../api/apiConfig";

const AddedTasks = () => {
  const user = VerifyToken();
  const createdBy = user?.username; // Ensure this is correct based on your token
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseUrl.scheduledtasks}?username=${createdBy}`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.data);
        setLoading(false);
      });
  }, [createdBy]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = (task) => {
    const subject = encodeURIComponent(`Task: ${task.taskName}`);
    const body = encodeURIComponent(`
      Task Name: ${task.taskName}
      Machine: ${task.selectedMachine.map(machine => machine.title).join(", ")}
      Estimated Time: ${task.estimatedTime}
      Scheduled Time Slot: ${
        task?.startDate
          ? `${formatDate(task.startDate)}, ${task.selectedTimeSlots[0]}`
          : "N/A"
      }
    `);
    const gmailLink = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=&su=${subject}&body=${body}`;

    window.open(gmailLink, "_blank");
  };

  return (
    <>
      <TabNav />
      <div className="px-4 py-10 text-[15px]">
        <h1 className="text-xl font-bold uppercase mb-6">Scheduled Tasks</h1>
        {loading ? (
          <Loader text={"Collecting Your Data"} />
        ) : (
          <div>
            {tasks.length > 0 ? (
              <div>
                {tasks.map((task, index) => (
                  <div
                    key={index}
                    className="flex justify-between mb-10 border-b-2 border-dashed border-gray-300"
                  >
                    <div>
                      <div className="grid grid-cols-2">
                        <h1 className="py-4 px-10 font-bold">Task Name</h1>
                        <p className="py-4 px-10">{task.taskName}</p>
                      </div>
                      <div className="grid bg-zinc-50 grid-cols-2">
                        <h1 className="py-4 px-10 font-bold">Machine</h1>
                        <p className="py-4 px-10">
                          {task.selectedMachine.map(machine => machine.title).join(", ")}
                        </p>
                      </div>
                      <div className="grid grid-cols-2">
                        <h1 className="py-4 px-10 font-bold">
                          Estimated time required to finish the task
                        </h1>
                        <p className="py-4 px-10">{task.estimatedTime}</p>
                      </div>
                      <div className="grid bg-zinc-50 grid-cols-2">
                        <h1 className="py-4 px-10 font-bold">
                          Scheduled time slot
                        </h1>
                        <p className="py-4 px-10">
                          {task?.startDate
                            ? `${formatDate(task.startDate)}, ${
                                task.selectedTimeSlots[0]
                              }`
                            : "N/A"}
                        </p>
                      </div>
                      <button
                        onClick={() => handleShare(task)}
                        className="block text-blue-500 py-4 px-10 underline underline-offset-4"
                      >
                        Share
                      </button>
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
