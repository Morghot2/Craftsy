import { useQuery } from '@tanstack/react-query';
import { get } from '@/services/apiClient';

const fetchUserPurchases = async () => {
  return await get('/users/purchases');
};

export const useUserPurchases = () => {
  return useQuery({
    queryKey: ['userPurchases'],
    queryFn: fetchUserPurchases,
  });
};
