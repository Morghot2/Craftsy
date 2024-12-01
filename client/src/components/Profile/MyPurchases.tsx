import { useUserPurchases } from '@/shared/queries/usePurchases';

export const MyPurchases = () => {
  const { data: purchases, isLoading, error } = useUserPurchases();

  if (isLoading) {
    return <p className="text-center">Loading your purchases...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error loading your purchases.</p>;
  }

  if (!purchases || purchases.length === 0) {
    return <p className="text-center text-gray-600">You don’t have any purchased services yet.</p>;
  }

  return (
    <div className="flex flex-col items-center px-6 py-10 min-h-screen">
      <h1 className="text-3xl font-bold text-[#224f34] mb-6">My Purchases</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {purchases.map((purchase) => (
          <div key={purchase.id} className="flex flex-col border border-gray-300 rounded-lg shadow-md w-full max-w-[300px] overflow-hidden">
            <div className="p-4">
              <h2 className="font-bold text-lg text-[#224f34]">{purchase.serviceName}</h2>
              <p className="text-gray-600 mt-2">{purchase.serviceDescription}</p>
              <p className="text-[#224f34] font-semibold mt-4">${purchase.servicePrice}</p>
              <p className="text-gray-500 text-sm mt-2">Purchased At: {new Date(purchase.purchasedAt).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
