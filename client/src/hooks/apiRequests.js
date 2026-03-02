import axios from "axios";


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const usePost = async (url, token = "", data) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        "token": token
      }
    })
    return response.data
  } catch (error) {
    return error.response.data
  }
};

export const usePatch = async (url, token = "", data) => {
  try {
    const response = await axios.patch(url, data, {
      headers: {
        "Content-Type": "application/json",
        "token": token
      }
    })
    return response.data
  } catch (error) {
    return error.response.data
  }
};


export const useGet = async (url, token = "") => {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "token": token
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
    return error.response.data
  }
};

export const useDelete = async (url, token = "") => {
  try {
    const response = await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
        "token": token
      }
    })
    return response.data
  } catch (error) {
    return error.response.data
  }
};