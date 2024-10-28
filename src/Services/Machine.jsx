import axios from "axios";
import baseUrl from "../api/apiConfig";

const getMachines = async () => {
  try {
    const response = await axios.get(`${baseUrl.machines}`);
    return response;
  } catch (error) {
    console.error("Error approving the task:", error);
    throw error;
  }
};

const MachineManagement = {
  getMachines,
};

// Export the object
export default MachineManagement;
