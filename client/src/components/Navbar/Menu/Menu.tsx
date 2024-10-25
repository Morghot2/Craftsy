// import { NavSections } from './NavSections/NavSections';
import { UserMenu } from './UserMenu/UserMenu';

export const Menu = () => {
  return (
    <div className="hidden justify-between items-center text-[#224f34]  md:flex">
      {/* <NavSections /> */}
      <UserMenu />
    </div>
  );
};
