import { useParams } from 'react-router-dom';
import { useServicesByCategory } from '@/shared/queries/useService';

export const CategoryPage = () => {
  const { name } = useParams();
  const { data: services } = useServicesByCategory(name);

  return (
    <div>
      <h2 className="font-bold text-xl text-[#224f34] mb-4">Services in {name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services?.map((service) => (
          <div key={service.id} className="bg-white shadow-md rounded-lg p-6">
            <h3 className="font-bold text-lg text-[#224f34]">{service.name}</h3>
            <p className="text-gray-700">{service.description}</p>
            <p className="text-gray-900 font-semibold">${service.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
