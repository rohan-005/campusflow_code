import axiosInstance from "./axiosInstance";

/* Student creates request */
export const createRequest = async (data) => {
  const res = await axiosInstance.post("/asset-requests", data);
  return res.data;
};

/* Admin gets pending requests */
export const getPendingRequests = async () => {
  const res = await axiosInstance.get("/asset-requests/pending");
  return res.data;
};

/* Admin approves request */
export const approveRequest = async (id) => {
  const res = await axiosInstance.put(`/asset-requests/${id}/approve`);
  return res.data;
};

export const getMyRequests = async () => {
  const res = await axiosInstance.get("/asset-requests/my");
  return res.data;
};