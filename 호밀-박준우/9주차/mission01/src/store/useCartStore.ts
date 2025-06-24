
import { create } from 'zustand';
import cartItemsData from '../constant.ts/carItems';
import type { Lp } from '../types/cart';

interface CartState {
  cartItems: Lp[];
  totalAmount: number;
  totalPrice: number;
  clearCart: () => void;
  removeItem: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  calculateTotals: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: cartItemsData,
  totalAmount: 0,
  totalPrice: 0,

  clearCart: () => set({ cartItems: [] }),

  removeItem: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  increase: (id) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      ),
    })),

  decrease: (id) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        )
        .filter((item) => item.amount > 0),
    })),

  calculateTotals: () => {
    const { cartItems } = get();
    const { totalAmount, totalPrice } = cartItems.reduce(
      (acc, item) => {
        acc.totalAmount += item.amount;
        acc.totalPrice += item.amount * item.price;
        return acc;
      },
      { totalAmount: 0, totalPrice: 0 }
    );
    set({ totalAmount, totalPrice });
  },
}));
