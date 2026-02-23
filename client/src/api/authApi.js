import axiosInstance from "./axiosInstance";

export const loginUser = async (data) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;   // IMPORTANT: return res.data
};

export const registerUser = async (data) => {
  const res = await axiosInstance.post("/auth/register", data);
  return res.data;
};