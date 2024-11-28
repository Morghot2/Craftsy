import { useCategories } from '@/shared/queries/useCategories';
import { Link } from 'react-router-dom';

export const Categories = () => {
  const { data: categories, isLoading, isError } = useCategories();

  if (isLoading) return <div className="text-center py-4">Loading categories...</div>;
  if (isError) return <div className="text-center py-4 text-red-500">Failed to load categories</div>;

  return (
    <div className="flex justify-center py-4 space-x-16 flex-wrap">
      {categories.map((category: { id: number; name: string }) => (
        <Link
          key={category.id}
          to={`/category/${category.name.toLowerCase()}`}
          className="flex-shrink-0 px-4 py-2 bg-white rounded-full shadow-md text-gray-700 font-medium transition-colors duration-200 ease-in-out hover:bg-[#224f34] hover:text-white mt-5"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};
