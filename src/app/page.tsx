import { getAllProducts } from "@/api/products";
import ProductList from "./(components)/ProductList";

export default async function Home() {
  const products = await getAllProducts();
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8">Товары</h2>
      <ProductList initialData={products} />
    </div>
  );
}
