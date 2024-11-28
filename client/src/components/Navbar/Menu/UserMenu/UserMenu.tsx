import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLogoutUser } from '@/shared/queries/useAuth';
import shoppingCart from '@/assets/shoppingCart.png';
import { PersonIcon } from '@radix-ui/react-icons';
import { RootState } from '@/app/store';

export const UserMenu = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const logoutMutation = useLogoutUser();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="flex justify-between items-center ml-[120px]">
      {isAuthenticated && (
        <Link to="/cart">
          <img src={shoppingCart} alt="Shopping Cart" className="cursor-pointer w-6 h-6 mr-4" />
        </Link>
      )}

      {isAuthenticated && (
        <Link to="/profile">
          <PersonIcon className="cursor-pointer w-6 h-6 text-[#224f34] mr-4" />
        </Link>
      )}

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
