import axios from "axios";

const upsertUser = async (userData) => {
  try {
    const response = await axios.post(`http://localhost:5000/users`, userData);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error creating the user:", error);
    throw error;
  }
};
const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`http://localhost:5000/login`, {
      username,
      password,
    });
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

const UserManagement = {
  upsertUser,
  loginUser,
};

// Export the object
export default UserManagement;
