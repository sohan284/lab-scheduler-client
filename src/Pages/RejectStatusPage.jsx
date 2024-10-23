import { useEffect } from "react";
import TaskManagement from "../Services/Task";
import { useParams } from "react-router-dom";

const RejectStatusPage = () => {
  const { taskId } = useParams();
  useEffect(() => {
    TaskManagement.rejectStatus(taskId);
  }, []);
  return (
    <div className="flex justify-center  bg-red-700 items-center h-screen">
      <h1 className="text-white font-bold text-4xl">
        You have Rejected this task
      </h1>
    </div>
  );
};

export default RejectStatusPage;
