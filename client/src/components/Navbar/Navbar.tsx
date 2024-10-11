import { Link, Outlet } from 'react-router-dom';
import { isLoggedIn } from '@/shared/utils/cokie';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);
  console.log(document.cookie);
  console.log(loggedIn);

  const handleLogout = () => {
    document.cookie = 'SESSION_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setLoggedIn(false);
    navigate('/login');
  };

  return (
    <>
      <div className="bg-primary dark:bg-slate-700 text-white py-2 px-5 flex justify-between font-sans items-center font-medium">
        <div className="text-sm font-medium">Craftsy</div>
        <div>{loggedIn ? <button onClick={handleLogout}>Logout</button> : <Link to="/login">Login</Link>}</div>
      </div>
      <Outlet />
    </>
  );
};
