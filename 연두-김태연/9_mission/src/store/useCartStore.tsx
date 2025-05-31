import { create } from 'zustand';
import cartItemsRaw from '../constants/cartItems';

interface CartItem {
  singer: string;
  img: string | undefined;
  id: string;
  title: string;
  price: number;
  amount: number;
}

interface CartState {
  cartItems: CartItem[];
  amount: number;
  total: number;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: cartItemsRaw.map(item => ({
    ...item,
    price: typeof item.price === 'string' ? parseInt(item.price, 10) : item.price,
  })),
  amount: 0,
  total: 0,
  increase: (id) => {
    set(state => ({
      cartItems: state.cartItems.map(item =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      )
    }));
    get().calculateTotals();
  },
  decrease: (id) => {
    set(state => ({
      cartItems: state.cartItems
        .map(item => item.id === id ? { ...item, amount: item.amount - 1 } : item)
        .filter(item => item.amount > 0)
    }));
    get().calculateTotals();
  },
  clearCart: () => {
    set({ cartItems: [] });
    get().calculateTotals();
  },
  calculateTotals: () => {
    const { cartItems } = get();
    const amount = cartItems.reduce((acc, item) => acc + item.amount, 0);
    const total = cartItems.reduce((acc, item) => acc + item.amount * item.price, 0);
    set({ amount, total });
  }
}));
