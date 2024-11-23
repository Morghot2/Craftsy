import main from '@/assets/main.png';

export const MainCard = () => {
  return (
    <section className="mt-10 xl:mt-0 flex justify-between items-center">
      <div className="text-[#224f34] inline-block w-full xl:w-auto ">
        <p className="font-['Rufina'] font-bold text-[60px] xl:text-[86px] xl:w-[650px] leading-tight xl:leading-[106px] mb-0 text-center xl:text-left">
          Discover and Support Local Artisans!
        </p>
        <p className="font-['Poppins'] font-medium text-[18px] xl:text-[24px] xl:w-[565px] leading-[30px] xl:leading-[52.8px] mb-0 text-center xl:text-left">
          Collaborate with artisans to design personalized creations, crafted with care and precision just for you.
        </p>
        <div className="mt-5 xl:mt-0 flex justify-center xl:block">
          <button className="w-3/4 xl:w-[258px] h-[74px] rounded-[3px] bg-[#224f34] text-white font-['Poppins'] text-[17px] xl:text-[20px] font-medium leading-[30px] transition-colors duration-200 ease-in-out hover:bg-transparent hover:text-[#224f34] hover:border hover:border-[#224f34]">
            Explore Now
          </button>
        </div>
      </div>
      <div className="hidden xl:inline-block pt-8">
        <img src={main} alt="Fashion image" />
      </div>
    </section>
  );
};
