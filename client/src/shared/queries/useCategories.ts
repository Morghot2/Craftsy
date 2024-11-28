import { useQuery } from '@tanstack/react-query';
import { get } from '../../services/apiClient';

export const fetchCategories = async () => {
  return await get('/categories');
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
};
