import Cart from "../components/Cart";
import Modal from "../components/Modal";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../store/store";
import { increase, decrease } from "../Slice/cartSlice";
import { useEffect } from "react";
import { calculateTotals } from "../Slice/cartSlice";

export default function MainPage(): JSX.Element {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const amount = useSelector((state: RootState) => state.cart.amount);
  const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);
  useEffect(() => {
  console.log("현재 cartItems: ", cartItems);
  dispatch(calculateTotals());
}, [cartItems, dispatch]);

  return (
   <div className="min-h-screen bg-white">
  {/* 헤더 */}
  <header className="w-full flex justify-between items-center px-6 py-4 bg-slate-900 text-white shadow-md">
    <h1 className="text-2xl font-bold">UMC_8th</h1>
    <div className="flex items-center space-x-1 text-lg font-semibold">
      <span className="text-xl">🛒</span>
      <span>{amount}</span>
    </div>
  </header>

  {/* 본문: 상품 목록 */}
  <main className="px-6 py-4 ">
    {/* 상품 리스트 컴포넌트로 반복 렌더링 */}
   {cartItems.map((item, index) => (
  <div key={index} className="flex items-center justify-between mb-4">
    <div className="flex items-center space-x-4">
      <img src={item.img} alt={item.title} className="w-20 h-20 object-cover rounded" />
      <div>
        <div className="font-semibold text-lg">{item.title}</div>
        <div className="text-sm text-gray-600">{item.singer}</div>
        <div className="text-blue-700 font-bold">${item.price.toLocaleString()}</div>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <button
        className="px-2 py-1 bg-gray-200 rounded"
        onClick={() => dispatch(decrease(item.id))}
      >-</button>
      <span className="min-w-[24px] text-center">{item.amount}</span>
      <button
        className="px-2 py-1 bg-gray-200 rounded"
        onClick={() => dispatch(increase(item.id))}
      >+</button>
    </div>
  </div>
))}

    <Cart/>
    {isModalOpen && <Modal />}

  </main>
</div>

  );
}
