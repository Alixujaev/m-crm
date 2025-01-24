// lib/store.ts
import { create } from "zustand";
import { ProductType } from "./types";

type MainState = {
  cartProducts: ProductType[];
  categories: string[];
  products: ProductType[];
  addProductToCart: (product: ProductType) => void;
  removeIdFromCart: (productId: number) => void;
  clearCart: () => void;
  setCategories: (categories: string[]) => void;
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
  setProducts: (products: ProductType[]) => void;
  addProduct: (product: ProductType) => void;
  removeProduct: (product: ProductType) => void;
};

export const useMainState = create<MainState>((set) => ({
  cartProducts: [],
  categories: [],
  products: [],
  addProductToCart: (product) => set((state) => ({ cartProducts: [...state.cartProducts, product] })),
  removeIdFromCart: (productId) => set((state) => ({ cartProducts: state.cartProducts.filter((item) => item.id !== productId) })),
  clearCart: () => set({ cartProducts: [] }),
  setCategories: (categories) => set({ categories }),
  addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),
  removeCategory: (category) => set((state) => ({ categories: state.categories.filter((item) => item !== category) })),
  setProducts: (products) => set({ products }),
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  removeProduct: (product) => set((state) => ({ products: state.products.filter((item) => item.id !== product.id) })),
}));
