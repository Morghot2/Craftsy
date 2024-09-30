import { Link, Outlet } from 'react-router-dom';

export const Navbar = () => {
  return (
    <>
      <div className="bg-primary dark:bg-slate-700 text-white py-2 px-5 flex justify-between font-sans items-center font-medium">
        <div className="text-sm font-medium">Craftsy</div>
        <Link to="/register">Join</Link>
      </div>
      <Outlet />
    </>
  );
};
