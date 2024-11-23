import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLogoutUser } from '@/shared/queries/useAuth';
import shoppingCart from '@/assets/shoppingCart.png';

export const UserMenu = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { isAuthenticated } = useSelector((state: any) => state.user);
  const logoutMutation = useLogoutUser();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="flex justify-between items-center ml-[120px]">
      {isAuthenticated && <img src={shoppingCart} alt="Shopping Cart" className="cursor-pointer" />}
      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          className="font-poppins text-[20px] font-medium leading-[30px] bg-transparent text-[#224f34] border-[2.5px] border-[#224f34] rounded-sm w-[142px] h-[52px] ml-[50px] flex items-center justify-center transition-colors duration-200 ease-in-out hover:bg-[#224f34] hover:text-white cursor-pointer"
        >
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          className="font-poppins text-[20px] font-medium leading-[30px] bg-transparent text-[#224f34] border-[2.5px] border-[#224f34] rounded-sm w-[142px] h-[52px] ml-[50px] flex items-center justify-center transition-colors duration-200 ease-in-out hover:bg-[#224f34] hover:text-white cursor-pointer"
        >
          Login
        </Link>
      )}
    </div>
  );
};
