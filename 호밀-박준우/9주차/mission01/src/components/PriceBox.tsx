import { useCartStore } from '../store/useCartStore';

const PriceBox = () => {
  const totalPrice = useCartStore((state) => state.totalPrice);

  return (
    <div className="p-12 flex justify-end text-xl font-semibold">
      총가격: {totalPrice.toLocaleString()}원
    </div>
  );
};

export default PriceBox;
