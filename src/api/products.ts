import axiosInstance from "@/lib/fetch";
import { ProductType, ProductsResponseType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const getAllProducts = async (): Promise<ProductsResponseType> => {
  const response:ProductsResponseType = await axiosInstance.get(`/products`);
  return response;
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });
};

export const createProduct = async (body: Omit<ProductType, "id">): Promise<ProductType> => {
  const response:ProductType = await axiosInstance.post(`/products/add`, body);
  return response;
};

export const editProduct = async (body: Omit<ProductType, "id">): Promise<ProductType> => {
  const response:ProductType = await axiosInstance.put(`/products/1`, body);
  return response;
};

export const deleteProduct = async (id: number): Promise<ProductType> => {
  const response:ProductType = await axiosInstance.delete(`/products/${id}`);
  return response;
};
