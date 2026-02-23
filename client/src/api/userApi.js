// api/userApi.js
import axiosInstance from "./axiosInstance";

export const getAllUsers = async () => {
  const res = await axiosInstance.get("/auth/all-users");
  return res.data;
};