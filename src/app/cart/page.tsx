"use client";
import React from "react";
import ProductList from "../(components)/ProductList";
import { useMainState } from "@/lib/store";

const Cart = () => {
  const { cartProducts } = useMainState();

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8">Товары в корзине</h2>
      <ProductList initialData={cartProducts} />
    </div>
  );
};

export default Cart;
