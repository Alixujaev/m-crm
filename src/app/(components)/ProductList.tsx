import React from "react";
import ProductCard from "./ProductCard";
import { ProductType } from "@/lib/types";

const ProductList = ({
  initialData,
}: {
  initialData: ProductType[];
  isCart?: boolean;
}) => {
  return initialData?.length > 0 ? (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {initialData?.map((product: ProductType) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  ) : (
    <p>No products</p>
  );
};

export default ProductList;
