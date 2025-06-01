import type { Lp } from "../types/cart";
import { useDispatch } from "react-redux";
import { increase, decrease, removeItem } from "../redux/cartSlice";

interface CartItemProps {
    lp: Lp;
}

const CartItem = ({ lp }: CartItemProps) => {
    const dispatch = useDispatch();

    return (
        <div className="flex items-center p4 border-b border-gray-200">
            <img
                src={lp.img}
                alt={`${lp.title}의 lp이미지`}
                className="w-20 h-20
        object-cover rounded mr-4" />
            <div className="flex-1">
                <h3 className="text-xl">{lp.title}</h3>
                <p className=" text-sm text-gray-600">{lp.singer}</p>
                <p className="text-sm font-bold text-gary-600">{lp.price} 원</p>
            </div>
            <div className="flex items-center">
                <button
                    onClick={() => {
                        if (lp.amount <= 1) {
                          dispatch(removeItem(lp.id)); // 1 이하일 때는 삭제
                        } else {
                          dispatch(decrease(lp.id));   // 그 외는 수량 감소
                        }
                      }}
                    className="px-3 py-1 bg-gray-300 text-gray-800 rounded-l
            hover:bg-gray-400 cursor-pointer">
                    -
                </button>
                <span className="px-4 py-[3px] border-y border-gray-300">{lp.amount}</span>
                <button
                    onClick={() => dispatch(increase(lp.id))}
                    className="px-3 py-1 bg-gray-300 text-gray-800 rounded-l
            hover:bg-gray-400 cursor-pointer">
                    +
                </button>
            </div>
        </div>
    )
}


export default CartItem;