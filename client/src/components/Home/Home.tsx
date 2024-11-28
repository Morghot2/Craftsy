import { MainCard } from './MainCard/MainCard';
import { Categories } from '../Categories/Categories';
export const Home = () => {
  return (
    <section className="w-full h-screen bg-main py-[2rem]">
      <Categories />
      <MainCard />
    </section>
  );
};
