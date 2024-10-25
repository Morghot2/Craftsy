import { Link, Outlet } from 'react-router-dom';
import { Menu } from './Menu/Menu';
import { MobileMenu } from './MobileMenu/MobileMenu';

export const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between items-center text-[#224f34] bg-main">
        <Link to="/" className="font-serif text-[40px] font-bold leading-[49px]">
          Crafty
        </Link>
        <Menu />
        <MobileMenu />
      </nav>
      <Outlet />
    </>
  );
};
//<Link to="/login">Login</Link>
