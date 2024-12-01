import { useParams } from 'react-router-dom';
import { useServiceById } from '@/shared/queries/useService';
import { useSelector } from 'react-redux';

export const ServicePage = () => {
  const { id } = useParams();
  const { data: service, isLoading, error } = useServiceById(Number(id));
  const user = useSelector((state: any) => state.user);
  if (isLoading) {
    return <p className="text-center">Loading service details...</p>;
  }

  if (error || !service) {
    return <p className="text-center text-red-500">Error loading service details</p>;
  }

  return (
    <div className="flex flex-col items-center px-6 py-10 min-h-screen">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-[#224f34] mb-4">{service.name}</h1>
        <img src={service.photo_url} alt={service.name} className="w-full h-[300px] object-cover rounded-lg mb-4" />
        <p className="text-gray-700 mb-4">{service.description}</p>
        <p className="text-[#224f34] font-semibold text-lg mb-4">Price: ${service.price}</p>
        <h2 className="text-2xl font-semibold mb-2">Seller Information</h2>
        <p className="text-gray-600 mb-2">Name: {service.seller_name || 'Unknown'}</p>
        <p className="text-gray-600 mb-2">Country: {service.seller_country || 'Unknown'}</p>
        <button
          onClick={() => alert('Stripe integration coming soon!')}
          className="py-2 px-4 bg-[#224f34] text-white rounded-lg hover:bg-[#1a3d28] transition-colors mt-6"
        >
          Purchase
        </button>
      </div>
    </div>
  );
};
