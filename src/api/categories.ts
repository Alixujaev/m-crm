import axiosInstance from "@/lib/fetch";
import { ProductType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const getCategories = async (): Promise<string[]> => {
  const response: string[] = await axiosInstance.get(`/products/category-list`);
  return response;
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};


export const createCategory = async (body: {name: string}): Promise<ProductType> => {
  const response: ProductType = await axiosInstance.post(`/products/add`, body);
  return response;
};

export const editCategory = async (body: {name: string}): Promise<ProductType> => {
  const response: ProductType = await axiosInstance.put(`/products/1`, body);
  return response;
};

export const deleteCategory = async (id: number): Promise<ProductType> => {
  const response:ProductType = await axiosInstance.delete(`/products/${id}`);
  return response;
};