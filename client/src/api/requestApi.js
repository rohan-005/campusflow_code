import axiosInstance from "./axiosInstance";

export const createRequest = async (data) => {
  const res = await axiosInstance.post("/asset-requests", data);
  return res.data;
};

export const getPendingRequests = async () => {
  const res = await axiosInstance.get("/asset-requests/pending");
  return res.data;
};

export const approveRequest = async (id) => {
  const res = await axiosInstance.put(`/asset-requests/${id}/approve`);
  return res.data;
};