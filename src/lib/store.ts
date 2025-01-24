// lib/store.ts
import { create } from "zustand";
import { ProductType } from "./types";

type MainState = {
  cartProductIds: number[];
  addIdToCart: (productId: number) => void;
  removeIdFromCart: (productId: number) => void;
  clearCart: () => void;
};

export const useMainState = create<MainState>((set) => ({
  cartProductIds: [],
  addIdToCart: (productId) => set((state) => ({ cartProductIds: [...state.cartProductIds, productId] })),
  removeIdFromCart: (productId) => set((state) => ({ cartProductIds: state.cartProductIds.filter((id) => id !== productId) })),
  clearCart: () => set({ cartProductIds: [] }),
}));
