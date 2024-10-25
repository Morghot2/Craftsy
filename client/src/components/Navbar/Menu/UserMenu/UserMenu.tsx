import { Link } from 'react-router-dom';
import shoppingCart from '@/assets/shoppingCart.png';

export const UserMenu = () => {
  return (
    <div className="flex justify-between items-center ml-[120px]">
      <img src={shoppingCart} alt="Shopping Cart" className="cursor-pointer" />
      <Link
        to="/login"
        className="font-poppins text-[20px] font-medium leading-[30px] bg-transparent text-[#224f34] border-[2.5px] border-[#224f34] rounded-sm w-[142px] h-[52px] ml-[50px] flex items-center justify-center transition-colors duration-200 ease-in-out hover:bg-[#224f34] hover:text-white cursor-pointer"
      >
        Login
      </Link>
    </div>
  );
};
