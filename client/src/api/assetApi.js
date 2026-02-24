import axiosInstance from "./axiosInstance";

export const getAllAssets = async () => {
  const res = await axiosInstance.get("/assets/approved");
  return res.data;
};

export const createAsset = async (data) => {
  const res = await axiosInstance.post("/assets", data);
  return res.data;
};
export const createStudentAsset = async (data) => {
  const res = await axiosInstance.post("/assets/student", data);
  return res.data;
};

export const getApprovedAssets = async () => {
  const res = await axiosInstance.get("/assets/approved");
  return res.data;
};

export const getPendingAssets = async () => {
  const res = await axiosInstance.get("/assets/pending");
  return res.data;
};

export const approveAsset = async (id) => {
  const res = await axiosInstance.put(`/assets/${id}/approve`);
  return res.data;
};
export const rejectAsset = async (id) => {
  const res = await axiosInstance.put(`/assets/${id}/reject`);
  return res.data;
};