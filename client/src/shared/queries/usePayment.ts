import { post } from '@/services/apiClient';

export const createStripeSession = async (serviceId: number) => {
  const response = await post('/payments/checkout', { serviceId });
  return response.url;
};
