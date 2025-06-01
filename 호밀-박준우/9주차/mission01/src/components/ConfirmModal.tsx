import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { closeModal } from '../redux/modalSlice';
import { clearCart } from '../redux/cartSlice';

const ConfirmModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-80 text-center">
        <p className="text-lg font-semibold mb-6">정말 삭제하시겠습니까?</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => dispatch(closeModal())}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            아니요
          </button>
          <button
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
            }}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
