import { useState } from 'react';
import { MobileNavbar } from './MobileNavbar';
import clsx from 'clsx';

export const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div
        className={clsx('w-8 h-8 z-20 top-4 right-5 md:hidden flex flex-col justify-around', isMenuOpen ? 'fixed' : 'static')}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div
          className={clsx(
            'w-8 h-1 bg-[#224f34] rounded-md transform transition-transform duration-300',
            isMenuOpen ? 'rotate-45 bg-white' : 'rotate-0',
          )}
        />
        <div
          className={clsx('w-8 h-1 bg-[#224f34] rounded-md transform transition-opacity duration-300', isMenuOpen ? 'opacity-0' : 'opacity-100')}
        />
        <div
          className={clsx(
            'w-8 h-1 bg-[#224f34] rounded-md transform transition-transform duration-300',
            isMenuOpen ? '-rotate-45 bg-white' : 'rotate-0',
          )}
        />
      </div>
      <MobileNavbar isOpen={isMenuOpen} />
    </>
  );
};
