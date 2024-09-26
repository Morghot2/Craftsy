import { Link, Outlet } from 'react-router-dom';
// import { Authentication } from './Authentication/Authentication';
export const Navbar = () => {
  //   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  return (
    <>
      <div className="bg-primary dark:bg-slate-700 text-white py-2 px-5 flex justify-between font-sans items-center font-medium">
        <div className="text-sm font-medium">Craftsy</div>
        <Link to="/auth">Join</Link>
      </div>
      <Outlet />
    </>
  );
};
