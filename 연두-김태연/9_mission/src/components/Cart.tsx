import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { openModal } from '../Slice/modalSlice';

const Cart: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <button 
      className='w-30 bg-slate-900 text-white shadow-md border-2 font-bold rounded-md'
      onClick={() => dispatch(openModal())}>전체 삭제</button>
    </div>
  );
};

export default Cart;
