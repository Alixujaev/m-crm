import axiosInstance from "@/lib/fetch";

export const getAllProducts = async () => {
  const response = await axiosInstance.get(`/products`);
  return response;
};
