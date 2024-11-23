import clsx from 'clsx';
import { Link } from 'react-router-dom';

export const MobileNavbar = ({ isOpen }: { isOpen: boolean }) => {
  const navSections = [
    { id: 1, name: 'Home', destination: '/' },
    { id: 2, name: 'Categories', destination: 'categories' },
    { id: 6, name: 'Login', destination: 'login' },
  ];

  return (
    <div
      className={clsx(
        'fixed top-0 right-0 bg-[#224f34] transition-transform duration-300 ease-in-out h-screen flex flex-col items-center justify-start pt-24',
        isOpen ? 'translate-x-0' : 'translate-x-full',
        'w-[30vw] md:w-full',
      )}
    >
      {navSections.map(({ id, name, destination }) => (
        <Link
          to={destination}
          key={id}
          className="text-white font-poppins font-medium text-lg w-full py-4 hover:text-[#224f34] hover:bg-white transition-colors duration-300 text-center"
        >
          {name}
        </Link>
      ))}
    </div>
  );
};
