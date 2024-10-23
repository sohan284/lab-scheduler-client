import { useEffect } from "react";
import TaskManagement from "../Services/Task";
import { useParams } from "react-router-dom";
import { CancelOutlined } from "@mui/icons-material";
const RejectStatusPage = () => {
  const { taskId } = useParams();
  useEffect(() => {
    TaskManagement.rejectStatus(taskId);
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-red-900">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
        <h1 className="text-red-800 font-bold text-3xl mb-4">Task Rejected!</h1>
        <p className="text-gray-600 mb-6">
          You have successfully rejected this task. Thank you!
        </p>
        <div className="flex justify-center mb-4">
          <CancelOutlined style={{ color: "green", fontSize: "100px" }} />
        </div>
      </div>
    </div>
  );
};

export default RejectStatusPage;
