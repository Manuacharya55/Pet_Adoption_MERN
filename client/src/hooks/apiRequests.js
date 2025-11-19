import axios from "axios";
import { useCallback, useEffect, useState } from "react";

axios.defaults.baseURL = `http://localhost:3000/api/v1`;

export const usePost = async(url, token="", data) => {
  try {
    const response = await axios.post(url,data,{
        headers:{
            "Content-Type":"application/json",
            "token" : token
        }
    })
    return response.data
  } catch (error) {
    return error.response.data
  }
};

export const usePatch = async(url, token="", data) => {
  try {
    const response = await axios.patch(url,data,{
        headers:{
            "Content-Type":"application/json",
            "token" : token
        }
    })
    return response.data
  } catch (error) {
    return error.response.data
  }
};


export const useGet = async(url, token="") => {
  try {
    const response = await axios.get(url,{
        headers:{
            "Content-Type":"application/json",
            "token" : token
        }
    })
    return response.data
  } catch (error) {
    return error.response.data
  }
};

export const useDelete = async(url, token="") => {
  try {
    const response = await axios.delete(url,{
        headers:{
            "Content-Type":"application/json",
            "token" : token
        }
    })
    return response.data
  } catch (error) {
    return error.response.data
  }
};