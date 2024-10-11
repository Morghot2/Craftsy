import { useMutation } from '@tanstack/react-query';

import { post } from '../../services/apiClient';

interface NewUser {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginUser {
  email: string;
  password: string;
}

const registerUser = async (data: NewUser) => {
  return post('/auth/register', data);
};

const loginUser = async (data: LoginUser) => {
  return post('/auth/login', data);
};

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser,
    mutationKey: ['registerUser'],
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
    mutationKey: ['loginUser'],
  });
};

export const useLogoutUser = () => {
  return useMutation({
    mutationFn: () => post('/auth/logout'),
    mutationKey: ['logoutUser'],
  });
};
