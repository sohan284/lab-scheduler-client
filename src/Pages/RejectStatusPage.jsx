import { useEffect, useState } from "react";
import TaskManagement from "../Services/Task";
import { useParams } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { CircularProgress } from "@mui/material";

const RejectStatusPage = () => {
  const { taskId } = useParams();
  const [isSuccess, setIsSuccess] = useState("Pending"); // Initialize to null

  useEffect(() => {
    const rejectTask = async () => {
      try {
        const res = await TaskManagement.approveStatus(taskId);

        if (res.status === 200 || res.status === 201 || res.data.success) {
          setIsSuccess("Success");
        } else {
          setIsSuccess("Failed");
        }
      } catch (error) {
        setIsSuccess("Failed");
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
        <div className="flex flex-col justify-center items-center h-screen px-5">
          <div className="bg-white rounded-lg p-8 max-w-md text-center">
            <div className="flex justify-center mb-4">
              <ErrorOutlineIcon
                style={{
                  fontSize: "50px",
                  backgroundColor: "#fb923c",
                  padding: "5px",
                  borderRadius: "100px",
                }}
              />
            </div>
            <p className="text-orange-400 mb-6">Link has been expired!!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default RejectStatusPage;
