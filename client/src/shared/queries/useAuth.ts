import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { post } from '../../services/apiClient';

interface NewUser {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface UserResponse {
  id: string;
  username: string;
  email: string;
}

const registerUser = async (data: NewUser) => {
  return post('/auth/register', data); // Adjust endpoint as needed
};

// Custom hook for user registration
export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser, // The function to call for the mutation
    mutationKey: ['registerUser'], // Unique key for the mutation
  });
};
