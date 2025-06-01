import type { Lp } from '../types/cart';
import { useCartStore } from '../store/useCartStore';

interface CartItemProps {
  lp: Lp;
}

const CartItem = ({ lp }: CartItemProps) => {
  const { increase, decrease, removeItem } = useCartStore();

  const handleDecrease = () => {
    if (lp.amount <= 1) removeItem(lp.id);
    else decrease(lp.id);
  };

  return (
    <div className="flex items-center p-4 border-b border-gray-200">
      <img src={lp.img} alt={lp.title} className="w-20 h-20 object-cover rounded mr-4" />
      <div className="flex-1">
        <h3 className="text-xl">{lp.title}</h3>
        <p className="text-sm text-gray-600">{lp.singer}</p>
        <p className="text-sm font-bold text-gray-700">{lp.price} 원</p>
      </div>
      <div className="flex items-center">
        <button onClick={handleDecrease}>-</button>
        <span className="px-4">{lp.amount}</span>
        <button onClick={() => increase(lp.id)}>+</button>
      </div>
    </div>
  );
};

export default CartItem;
