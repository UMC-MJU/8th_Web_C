import { useCartActions, useCartInfo } from "../hooks/useCartStore";

export default function ConfirmModal() {
  const { isModalOpen } = useCartInfo();
  const { clearCart, closeModal } = useCartActions();
  if (!isModalOpen) return null; // 모달이 열려있지 않으면 아무것도 렌더링하지 않음

  const handleCancel = () => {
    closeModal();
  };

  const handleConfirm = () => {
    clearCart();
    closeModal();
  };

  return (
    // 배경 오버레이
    <div
      className="
        fixed inset-0 z-50 
        flex items-center justify-center 
        bg-black/50               /* 검정 50% 반투명 */
        backdrop-blur-sm          /* 뒤에 콘텐츠를 약하게 블러 처리 */
      "
    >
      <div className="bg-white rounded-lg shadow-lg w-80 p-6">
        <h2 className="text-center text-lg font-semibold mb-4">
          정말 삭제하시겠습니까?
        </h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
          >
            아니요
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
}
