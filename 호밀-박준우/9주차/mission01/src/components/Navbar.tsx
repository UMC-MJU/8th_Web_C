import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const Navbar = () => {
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-semibold">박준우</h1>
      <div className="flex items-center space-x-2">
        <FaShoppingCart className="text-2xl" />
        <span className="text-xl font-medium">{totalAmount}</span>
      </div>
    </div>
  );
};

export default Navbar;
