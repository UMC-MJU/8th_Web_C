import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import modalReducer from "../slices/modalSlice";

function createStore() {
    const store = configureStore({
        reducer: {
            cart: cartReducer,
            modal: modalReducer,
        },
    })
    return store;
}

// 싱들 톤 패턴
const store = createStore();

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;