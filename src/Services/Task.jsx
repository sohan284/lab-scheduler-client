import axios from "axios";
import baseUrl from "../api/apiConfig";

const approveStatus = async (id,data) => {
  try {
    const response = await axios.put(`${baseUrl.task}/approve/${id}`,data);
    return response; // Return the entire response object
  } catch (error) {
    // Handle errors
    console.error("Error approving the task:", error);
    throw error;
  }
};
const rejectStatus = async (id,data) => {
  try {
    const response = await axios.put(`${baseUrl.task}/reject/${id}`,data);
    return response; // Return the entire response object
  } catch (error) {
    // Handle errors
    console.error("Error rejecting the task:", error);
    throw error;
  }
};

const TaskManagement = {
  approveStatus,
  rejectStatus,
};

// Export the object
export default TaskManagement;
