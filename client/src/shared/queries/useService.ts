// useService.ts

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

export const fetchServicesByCategory = async (categoryName: string) => {
  return await get(`/services/category/${categoryName}`);
};

export const useServicesByCategory = (categoryName: string) => {
  return useQuery({
    queryKey: ['services', 'category', categoryName],
    queryFn: () => fetchServicesByCategory(categoryName),
    enabled: !!categoryName,
  });
};
