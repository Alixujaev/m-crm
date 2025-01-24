import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({
  initialData,
  isCart,
}: {
  initialData: any;
  isCart?: boolean;
}) => {
  return initialData?.length > 0 ? (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {initialData?.map((product: any) => (
          <ProductCard key={product.id} product={product} isCart={isCart} />
        ))}
      </div>
    </div>
  ) : (
    <p>No products</p>
  );
};

export default ProductList;
