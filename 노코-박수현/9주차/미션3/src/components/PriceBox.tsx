import { useCartInfo } from "../hooks/useCartStore";
import { useModalActions } from "../hooks/useModalStore";

const PriceBox = () => {
    const { total } = useCartInfo();
    const { openModal } = useModalActions();

    const handleInitializeCart = () => {
        openModal();
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
