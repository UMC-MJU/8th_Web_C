
import  CartItem  from "./CartItem";
import { openModal } from "../redux/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { useEffect } from "react";
import { calculateTotals } from "../redux/cartSlice";

const CartList = () => {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(calculateTotals());
      }, [cartItems, dispatch]);

  return (
    <div className=" flex flex-col items-center justify-center">
        <ul>
            {cartItems.map((item) => (
                <CartItem key={item.id} lp={item} />
            ))}
        </ul>
        {cartItems.length > 0 && (
        <button
          onClick={() => dispatch(openModal())}
          className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded shadow"
        >
          장바구니 비우기
        </button>
      )}
        </div>
  )
}

export default CartList;