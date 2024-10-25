import clsx from 'clsx'; // Helps with conditional classes
import { Link } from 'react-router-dom';

export const MobileNavbar = ({ isOpen }: { isOpen: boolean }) => {
  const navSections = [
    { id: 1, name: 'HOME' },
    { id: 2, name: 'CATEGORIES' },
    { id: 6, name: 'LOGIN' },
  ];

  return (
    <div
      className={clsx(
        'fixed top-0 right-0 bg-[#224f34] transition-transform duration-300 ease-in-out h-screen flex flex-col items-center justify-start pt-24',
        isOpen ? 'translate-x-0' : 'translate-x-full',
        'w-[30vw] md:w-full', // Full width on small screens, 30% on larger screens
      )}
    >
      {navSections.map(({ id, name }) => (
        <Link
          to="/"
          key={id}
          className="text-white font-poppins font-medium text-lg w-full py-4 hover:text-[#224f34] hover:bg-white transition-colors duration-300 text-center"
        >
          {name}
        </Link>
      ))}
    </div>
  );
};
