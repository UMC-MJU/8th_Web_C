import { useCartActions } from "../hooks/useCartStore";
import { useModalActions, useModalInfo } from "../hooks/useModalStore";

const Modal = () => {
    const { isModal } = useModalInfo();
    const { clearCart } = useCartActions();
    const { closeModal } = useModalActions();

    const handleCloseModal = () => {
        closeModal();
    }
    const handleDeleteCart = () => {
        clearCart();
        closeModal();
    }
    return (
        <>
            {isModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
                <div onClick={handleCloseModal} className="absolute inset-0 backdrop-blur-sm bg-black/20" />
                <div className="relative z-10 bg-white rounded-lg shadow-md p-5">
                    <h1 className="text-bold test-md mb-3">정말 삭제하시겠습니까?</h1>
                    <div className="flex justify-end gap-4">
                        <button onClick={handleCloseModal} className="px-2 py-1 bg-gray-300 text-sm rounded hover:bg-gray-400 cursor-pointer">아니요</button>
                        <button onClick={handleDeleteCart} className="px-2 py-1 bg-red-500 text-sm rounded text-white hover:bg-red-600 cursor-pointer">네</button>
                    </div>
                </div>
            </div >}
        </>
    )
}

export default Modal
