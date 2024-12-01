import { useParams, Link, useNavigate } from 'react-router-dom';
import { useServicesByCategory } from '@/shared/queries/useService';
import { useCategories } from '@/shared/queries/useCategories';
import { useSelector } from 'react-redux';

export const CategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: services, isLoading, error } = useServicesByCategory(Number(id));
  const { data: categories } = useCategories();
  const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);

  const categoryName = categories?.find((category) => category.id === Number(id))?.name || 'Unknown Category';

  if (isLoading) {
    return <p className="font-['Rufina'] text-center text-lg">Loading services...</p>;
  }

  if (error) {
    return <p className="font-['Rufina'] text-center text-lg text-red-500">Error loading services. Please try again later.</p>;
  }

  const handlePurchaseClick = (serviceId: number) => {
    if (isAuthenticated) {
      navigate(`/service/${serviceId}`);
    } else {
      navigate(`/login?redirect=/service/${serviceId}`);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen px-6 py-10 font-['Rufina']">
      <div className="flex justify-center flex-wrap gap-4 mb-10">
        {categories?.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className={`flex-shrink-0 px-4 py-2 rounded-full shadow-md font-medium transition-colors duration-200 ease-in-out mt-2 ${
              category.id === Number(id) ? 'bg-[#224f34] text-white scale-110' : 'bg-white text-gray-700 hover:bg-[#224f34] hover:text-white'
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#224f34]">{categoryName}</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services?.length > 0 ? (
          services.map((service) => (
            <div key={service.id} className="flex flex-col border border-gray-300 rounded-lg shadow-md overflow-hidden" style={{ height: '450px' }}>
              <div className="w-full h-[200px] overflow-hidden bg-gray-100">
                <img src={service.photo_url || service.thumbnail} alt={service.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 bg-white flex flex-col items-center justify-between h-[calc(450px-200px)]">
                <h3 className="font-bold text-lg text-[#224f34] text-center">{service.name}</h3>
                <p className="text-gray-600 mt-2 text-center flex-grow line-clamp-3">{service.description}</p>
                <p className="text-[#224f34] font-semibold text-md mt-4 text-center">${service.price}</p>
                <button
                  onClick={() => handlePurchaseClick(service.id)}
                  className="py-2 px-4 mt-4 bg-[#224f34] text-white rounded-lg hover:bg-[#1a3d28] transition-colors"
                >
                  Purchase
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">No services found for this category.</p>
        )}
      </div>
    </div>
  );
};
