import { useQuery } from '@tanstack/react-query';
import { get } from '@/services/apiClient/index';

const fetchUserProfile = async () => {
  const response = await get('/users/profile');
  return response;
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
  });
};
