import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlice";

const PriceBox = () => {
    const { total } = useSelector((state) => state.cart);
    const dispathch = useDispatch();

    const handleInitializeCart = () => {
        dispathch(clearCart());
    }

    return (
        <div className='p-12 flex justify-between'> {/* 스타일 수정하기 */}
            <button onClick={handleInitializeCart} className="border p-4 rounded-md cursor-pointer">
                장바구니 초기화
            </button>
            <div>총 가격: {total}원</div>
        </div>
    )
}

export default PriceBox
