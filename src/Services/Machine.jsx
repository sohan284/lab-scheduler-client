import axios from "axios";
import baseUrl from "../api/apiConfig";

const getMachines = async () => {
 const token = localStorage.getItem('token'); 
  try {
    const response = await axios.get(`${baseUrl.machines}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error retrieving machines:", error);
    throw error; 
  }
};

const MachineManagement = {
  getMachines,
};

export default MachineManagement;
