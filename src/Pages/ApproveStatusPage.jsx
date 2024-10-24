import { useEffect, useState } from "react";
import TaskManagement from "../Services/Task";
import { useParams } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { CancelOutlined } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

const ApproveStatusPage = () => {
  const { taskId } = useParams();
  const [isSuccess, setIsSuccess] = useState(null);

  useEffect(() => {
    const approveTask = async () => {
      try {
        const res = await TaskManagement.approveStatus(taskId);
        if (res.status === 200) {
          setIsSuccess(true);
        } else {
          setIsSuccess(false);
        }
      } catch (error) {
        setIsSuccess(false);
      }
    };

    approveTask();
  }, [taskId]);
  if (isSuccess === null) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-white font-bold text-4xl mb-4">
          <CircularProgress size="70px" />
        </h1>
      </div>
    );
  }
  return (
    <>
      {isSuccess ? (
        <div className="flex flex-col justify-center items-center h-screen bg-green-900 px-5">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
            <>
              <h1 className="text-green-800 font-bold text-3xl mb-4">
                Task Approved!
              </h1>
              <p className="text-gray-600 mb-6">
                {" "}
                You have successfully accepted this task. Thank you!
              </p>
              <div className="flex justify-center mb-4">
                <CheckCircleOutlineIcon
                  style={{ color: "green", fontSize: "100px" }}
                />
              </div>
            </>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen bg-red-900 px-5">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
            <h1 className="text-red-800 font-bold text-3xl mb-4">
              Approval Failed
            </h1>
            <p className="text-gray-600 mb-6">
              Task must be Pending to approve.
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

export default ApproveStatusPage;
