import { useMutation, useQuery } from '@tanstack/react-query';
import { post } from '@/services/apiClient';
import { get } from '../../services/apiClient';

export const useAddService = () => {
  return useMutation({
    mutationFn: (formData: FormData) => {
      return post('/services', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    mutationKey: ['addService'],
  });
};

export const fetchServicesByCategory = async (categoryId: number) => {
  return await get(`/services/category/${categoryId}`);
};

export const useServicesByCategory = (categoryId: number) => {
  return useQuery({
    queryKey: ['services', 'category', categoryId],
    queryFn: () => fetchServicesByCategory(categoryId),
    enabled: !!categoryId,
  });
};
