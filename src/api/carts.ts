import axiosInstance from "@/lib/fetch";
import { ProductType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const getCartProducts = async () => {
  const response = await axiosInstance.get(`/carts/1`);
  return response;
};

export const useCartProducts = () => {
  return useQuery({
    queryKey: ['cartProducts'],
    queryFn: getCartProducts,
  });
};

export const addToCart = async (body: ProductType) => {
  const response = await axiosInstance.put(`/carts/1`, {
    body: JSON.stringify({
      merge: true,
      products: [body]
    })
  });
  return response;
};

export const removeFromCart = async (body: ProductType) => {
  const response = await axiosInstance.put(`/carts/1`, {
    body: JSON.stringify({
      merge: true,
      products: [body]
    })
  });
  return response;
};