import React from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../Slice/cartSlice';
import { closeModal } from '../Slice/modalSlice';

const Modal: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className=" modal fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h2 className="text-lg font-bold mb-4 text-center">정말 전체 삭제하시겠습니까?</h2>
              <div className="flex justify-center space-x-4">
                <button
                  className="bg-gray-300 hover:bg-gray-400 w-20 px-4 py-2 rounded"
                  onClick={() => dispatch(closeModal())}>
                  아니요
                </button>
                <button
                  className="bg-slate-900 text-white px-4 py-2 rounded w-20"
                  onClick={() => {
                  dispatch(clearCart());
                  dispatch(closeModal());
                }}
                      >
                  예
                </button>
              </div>
            </div>
      </div>
  );
};

export default Modal;
