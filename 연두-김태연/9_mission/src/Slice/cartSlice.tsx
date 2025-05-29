import cartItems from "../constants/cartItems";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
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
}

const initialState: CartState = {
  cartItems: cartItems.map(item => ({
    ...item,
    price: typeof item.price === 'string' ? parseInt(item.price, 10) : item.price,
  })),
  amount: 0,
  total: 0,
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const item = state.cartItems.find(i => i.id === action.payload.id);
      if (item) {
        item.amount += 1;
      } else {
        state.cartItems.push({ ...action.payload, amount: 1 });
      }
    },
    increase: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find(i => i.id === action.payload);
      if (item) item.amount += 1;
    },
    decrease: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find(i => i.id === action.payload);
      if (item) {
        item.amount -= 1;
        if (item.amount < 1) {
          state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
        }
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach(item => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
});

export const {
  addItem,
  increase,
  decrease,
  removeItem,
  clearCart,
  calculateTotals
} = cartSlice.actions;

export default cartSlice.reducer;
