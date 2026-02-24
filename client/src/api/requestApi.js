import axiosInstance from "./axiosInstance";

// Student creates request
export const createRequest = async (data) => {
  const res = await axiosInstance.post("/asset-requests", data);
  return res.data;
};

// Admin gets pending requests
export const getPendingRequests = async () => {
  const res = await axiosInstance.get("/asset-requests/pending");
  return res.data;
};

// Student gets own requests
export const getMyRequests = async () => {
  const res = await axiosInstance.get("/asset-requests/my");
  return res.data;
};

// Admin approves request
export const approveRequest = async (id) => {
  const res = await axiosInstance.put(`/asset-requests/${id}/approve`);
  return res.data;
};

// Admin rejects request
export const rejectRequest = async (id) => {
  const res = await axiosInstance.put(`/asset-requests/${id}/reject`);
  return res.data;
};

export const getAllRequests = async () => {
  const res = await axiosInstance.get("/asset-requests/all");
  return res.data;
};