// lib/store.ts
import { create } from "zustand";
import { ProductType } from "./types";

type MainState = {
  cartProducts: ProductType[];
  addProductToCart: (product: ProductType) => void;
  removeIdFromCart: (productId: number) => void;
  clearCart: () => void;
};

export const useMainState = create<MainState>((set) => ({
  cartProducts: [],
  addProductToCart: (product) => set((state) => ({ cartProducts: [...state.cartProducts, product] })),
  removeIdFromCart: (productId) => set((state) => ({ cartProducts: state.cartProducts.filter((item) => item.id !== productId) })),
  clearCart: () => set({ cartProducts: [] }),
}));
