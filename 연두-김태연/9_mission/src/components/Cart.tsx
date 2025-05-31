// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { openModal } from '../Slice/modalSlice';

// const Cart: React.FC = () => {
//   const dispatch = useDispatch();

//   return (
//     <div className="w-full flex justify-center">
//       <button 
//         className="w-full py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all duration-200"
//         onClick={() => dispatch(openModal())}
//       >
//         전체 삭제
//       </button>
//     </div>
//   );
// };

// export default Cart;


import React from 'react';
import { useModalStore } from '../store/useModalStore';

const Cart: React.FC = () => {
  const { openModal } = useModalStore();

  return (
    <div className="w-full flex justify-center">
      <button 
        className="w-full py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all duration-200"
        onClick={openModal}
      >
        전체 삭제
      </button>
    </div>
  );
};

export default Cart;

