import axiosInstance from "./axiosInstance";

export const uploadResource = async (formData) => {
  const res = await axiosInstance.post("/resources", formData);
  return res.data;
};

export const getPendingResources = async () => {
  const res = await axiosInstance.get("/resources/pending");
  return res.data;
};

export const getApprovedResources = async () => {
  const res = await axiosInstance.get("/resources/approved");
  return res.data;
};

export const approveResource = async (id) => {
  await axiosInstance.put(`/resources/${id}/approve`);
};

export const rejectResource = async (id) => {
  await axiosInstance.put(`/resources/${id}/reject`);
};