import axiosInstance from "@/lib/fetch";

export const getAllProducts = async (): Promise<any> => {
  const response = await axiosInstance.get(`/products`);
  return response;
};
