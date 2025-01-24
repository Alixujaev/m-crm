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


export const createCategory = async (body: {name: string}): Promise<any> => {
  const response = await axiosInstance.post(`/products/add`, body);
  return response;
};

export const editCategory = async (body: {name: string}): Promise<any> => {
  const response = await axiosInstance.post(`/products/add`, body);
  return response;
};

export const deleteCategory = async (id: number): Promise<any> => {
  const response = await axiosInstance.delete(`/products/${id}`);
  return response;
};