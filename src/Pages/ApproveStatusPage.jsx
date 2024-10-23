import { useEffect } from "react";
import TaskManagement from "../Services/Task";
import { useParams } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
const ApproveStatusPage = () => {
  const { taskId } = useParams();

  useEffect(() => {
    TaskManagement.approveStatus(taskId);
  }, [taskId]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-green-900 px-5">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
        <h1 className="text-green-800 font-bold text-3xl mb-4">
          Task Approved!
        </h1>
        <p className="text-gray-600 mb-6">
          You have successfully approved this task. Thank you!
        </p>
        <div className="flex justify-center mb-4">
          <CheckCircleOutlineIcon
            style={{ color: "green", fontSize: "100px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ApproveStatusPage;
