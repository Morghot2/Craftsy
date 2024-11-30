import { useMutation } from '@tanstack/react-query';
import { post } from '@/services/apiClient';

const becomeSellerApi = async (data: { bio: string; country: string; phone: string; name: string; surname: string }) => {
  return post('/users/become-seller', data);
};

export const useBecomeSeller = () => {
  return useMutation({
    mutationFn: becomeSellerApi,
    mutationKey: ['becomeSeller'],
  });
};
