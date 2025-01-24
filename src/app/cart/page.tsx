import React from "react";
import ProductList from "../(components)/ProductList";
import { getCartProducts } from "@/api/carts";

const page = async () => {
  const products = await getCartProducts();
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8">Товары в корзине</h2>
      <ProductList initialData={products} isCart />
    </div>
  );
};

export default page;
