import { useMutation } from '@tanstack/react-query';
import { post } from '@/services/apiClient';

interface BecomeSellerData {
  bio: string;
  country: string;
  phone: string;
  name: string;
  surname: string;
}

const becomeSellerApi = async (data: BecomeSellerData) => {
  return post('/users/become-seller', data);
};

export const useBecomeSeller = () => {
  return useMutation({
    mutationFn: becomeSellerApi,
    mutationKey: ['becomeSeller'],
  });
};
