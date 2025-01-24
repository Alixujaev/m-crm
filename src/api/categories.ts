import axiosInstance from "@/lib/fetch";
import { useQuery } from "@tanstack/react-query";

export const getCategories = async (): Promise<any> => {
  const response = await axiosInstance.get(`/products/category-list`);
  return response;
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};

