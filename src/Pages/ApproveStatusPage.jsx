import { useEffect } from "react";
import TaskManagement from "../Services/Task";
import { useParams } from "react-router-dom";

const ApproveStatusPage = () => {
  const { taskId } = useParams();

  useEffect(() => {
    TaskManagement.approveStatus(taskId);
  }, []);
  return (
    <div className="flex justify-center  bg-green-700 items-center h-screen">
      <h1 className="text-white font-bold text-4xl">
        You have Accepted this task
      </h1>
    </div>
  );
};

export default ApproveStatusPage;
