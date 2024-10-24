import { useEffect, useState } from "react";
import TaskManagement from "../Services/Task";
import { useParams } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { CancelOutlined } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

const RejectStatusPage = () => {
  const { taskId } = useParams();
  const [isSuccess, setIsSuccess] = useState("Pending"); // Initialize to null

  useEffect(() => {
    const rejectTask = async () => {
      try {
        const res = await TaskManagement.rejectStatus(taskId);
        if (res.status === 200) {
          setIsSuccess("Success"); // Set to true if successful
        } else {
          setIsSuccess("Failed"); // Set to false for other statuses
        }
      } catch (error) {
        setIsSuccess("Failed"); // Handle errors by setting to false
      }
    };

    rejectTask();
  }, [taskId]);

  // Show loading while isSuccess is null
  if (isSuccess === "Pending") {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-white font-bold text-4xl mb-4">
          <CircularProgress size="70px" />
        </h1>
      </div>
    );
  }

  // Render success or failure message based on isSuccess
  return (
    <>
      {isSuccess === "Success" ? (
        <div className="flex flex-col justify-center items-center h-screen bg-green-900 px-5">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
            <h1 className="text-green-800 font-bold text-3xl mb-4">
              Task Rejected!
            </h1>
            <p className="text-gray-600 mb-6">
              You have successfully rejected this task. Thank you!
            </p>
            <div className="flex justify-center mb-4">
              <CheckCircleOutlineIcon
                style={{ color: "green", fontSize: "100px" }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen bg-red-900 px-5">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
            <h1 className="text-red-800 font-bold text-3xl mb-4">
              Rejection Failed
            </h1>
            <p className="text-gray-600 mb-6">
              Task must be Pending to reject.
            </p>
            <div className="flex justify-center mb-4">
              <CancelOutlined style={{ color: "green", fontSize: "100px" }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RejectStatusPage;
