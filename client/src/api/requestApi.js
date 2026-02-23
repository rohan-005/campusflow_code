import axiosInstance from "./axiosInstance";

export const createRequest = async (data) => {
  const res = await axiosInstance.post("/asset-requests", data);
  return res.data;
};

export const getMyRequests = async () => {
  const res = await axiosInstance.get("/asset-requests/my");
  return res.data;
};

export const getAllRequests = async () => {
  const res = await axiosInstance.get("/asset-requests/all");
  return res.data;
};

export const approveRequest = async (id) => {
  const res = await axiosInstance.put(`/asset-requests/${id}/approve`);
  return res.data;
};

export const rejectRequest = async (id) => {
  const res = await axiosInstance.put(`/asset-requests/${id}/reject`);
  return res.data;
};