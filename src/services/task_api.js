import axios from "axios";

const API_URL = "http://localhost:8000/api";

// Helper function to get JWT token headers
const getAuthConfig = () => {
  const token = localStorage.getItem("access_token");
  if (!token) return {};
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/addtask/`, getAuthConfig());
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching tasks:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await axios.post(
      `${API_URL}/addtask/`,
      taskData,
      getAuthConfig(),
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating task:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const updateTask = async (taskId, updatedData) => {
  try {
    // Using PATCH so you can update just 'status' or just 'title' without sending the whole object
    const response = await axios.patch(
      `${API_URL}/addtask/${taskId}/`,
      updatedData,
      getAuthConfig(),
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error updating task ${taskId}:`,
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/addtask/${taskId}/`,
      getAuthConfig(),
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting task ${taskId}:`,
      error.response?.data || error.message,
    );
    throw error;
  }
};
