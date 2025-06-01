import { useCartActions, useCartInfo } from "../hooks/useCartStore";

const PriceBox = () => {
  const { total } = useCartInfo();
  const { openModal } = useCartActions();

  const handleInitializeCart = () => {
    openModal(); // 모달 열기
  };

  return (
    <div className="p-12 flex justify-between">
      <button
        onClick={handleInitializeCart}
        className="border p-4 rounded-md cursor-pointer"
      >
        장바구니 초기화
      </button>

      <div>총 가격: {total}원</div>
    </div>
  );
};

export default PriceBox;
