import CartItem from './CartItem';
import { useEffect } from 'react';
import { useCartStore } from '../store/useCartStore';
import { useModalStore } from '../store/useModalStore';

const CartList = () => {
  const { cartItems, calculateTotals } = useCartStore();
  const { openModal } = useModalStore();

  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

  return (
    <div className="flex flex-col items-center justify-center">
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
      {cartItems.length > 0 && (
        <button
          onClick={openModal}
          className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded shadow"
        >
          장바구니 비우기
        </button>
      )}
    </div>
  );
};

export default CartList;