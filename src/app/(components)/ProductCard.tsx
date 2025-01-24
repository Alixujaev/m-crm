"use client";

import { addToCart, removeFromCart } from "@/api/carts";
import { useMainState } from "@/lib/store";
import { ProductType } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

const ProductCard = ({
  product,
}: {
  product: ProductType;
  isCart?: boolean;
}) => {
  const { cartProducts, addProductToCart, removeIdFromCart } = useMainState();

  const addMutation = useMutation({
    mutationFn: (data: ProductType) => addToCart(data),
    onSuccess: () => {
      toast.success("Продукт успешно добавлен в корзину");
    },
    onError: () => {
      removeIdFromCart(product.id);
      toast.error("Произошла ошибка при добавлении продукта в корзину");
    },
  });

  const removeMutation = useMutation({
    mutationFn: (data: ProductType) => removeFromCart(data),
    onSuccess: () => {
      toast.success("Продукт успешно удален из корзины");
    },
    onError: () => {
      addProductToCart(product);
      toast.error("Произошла ошибка при удалении продукта из корзины");
    },
  });

  const handleAddToCart = (product: ProductType) => {
    addProductToCart(product);
    addMutation.mutate(product);
  };

  const handleRemoveFromCart = (product: ProductType) => {
    removeIdFromCart(product.id);
    removeMutation.mutate(product);
  };

  return (
    <div className="shadow rounded-[8px] w-auto relative">
      <div className="p-4 border-b mb-2">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={200}
          height={200}
          className="w-[80%] h-[200px] mx-auto object-cover"
        />
      </div>
      <div className="px-4">
        <h2 className="font-semibold text-xl mb-2">{product.title}</h2>
        <p className="text-[#4B5563] mb-16">{product.description}</p>

        {cartProducts.includes(product) ? (
          <button
            onClick={() => handleRemoveFromCart(product)}
            className="absolute bottom-0 text-center w-full py-3 bg-[#FF5C5C] text-white left-0 rounded-b-[8px]"
          >
            Удалить из корзины
          </button>
        ) : (
          <button
            onClick={() => handleAddToCart(product)}
            className="absolute bottom-0 text-center w-full py-3 bg-[#28b393] text-white left-0 rounded-b-[8px]"
          >
            Добавить в корзину
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
