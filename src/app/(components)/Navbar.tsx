"use client";

import { useCartProducts } from "@/api/carts";
import { useMainState } from "@/lib/store";
import { ProductType } from "@/lib/types";
import Link from "next/link";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Navbar = () => {
  const { cartProducts, addProductToCart, clearCart } = useMainState();
  const { data, error } = useCartProducts();

  useEffect(() => {
    if (data) {
      data.products.forEach((product: ProductType) =>
        addProductToCart(product)
      );
    }

    return () => clearCart();
  }, [data]);

  if (error) {
    toast.error("Произошла ошибка при получении товаров в корзину");
  }

  return (
    <div className="px-8 py-5 bg-white shadow flex items-center justify-end">
      <Link href="/cart">Корзина ({cartProducts.length})</Link>
    </div>
  );
};

export default Navbar;
