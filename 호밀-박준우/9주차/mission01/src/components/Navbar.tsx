import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../store/useCartStore";

const Navbar = () => {
  const totalAmount = useCartStore((state) => state.totalAmount);

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
