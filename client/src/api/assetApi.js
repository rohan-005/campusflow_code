import axiosInstance from "./axiosInstance";

export const getAllAssets = async () => {
  const res = await axiosInstance.get("/assets");
  return res.data;
};

export const createAsset = async (data) => {
  const res = await axiosInstance.post("/assets", data);
  return res.data;
};