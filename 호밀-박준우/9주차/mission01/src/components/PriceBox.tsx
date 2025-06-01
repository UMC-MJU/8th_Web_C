import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const PriceBox = () => {
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  return (
    <div className="p-12 flex justify-end text-xl font-semibold">
      총가격: {totalPrice.toLocaleString()}원
    </div>
  );
};

export default PriceBox;
