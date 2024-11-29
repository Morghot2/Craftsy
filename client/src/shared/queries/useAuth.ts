import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '../../main';
import { loginUser, logoutUser } from '@/app/slices/userSlice';
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

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser,
    mutationKey: ['registerUser'],
  });
};

const loginUserApi = async (data: LoginUser) => post('/auth/login', data);

export const useLoginUser = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: loginUserApi,
    mutationKey: ['loginUser'],
    onSuccess: (user) => {
      dispatch(loginUser({ id: user.id, username: user.username, email: user.email }));
    },
  });
};

const logoutUserApi = async () => post('/auth/logout');

export const useLogoutUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUserApi,
    mutationKey: ['logoutUser'],
    onSuccess: () => {
      dispatch(logoutUser());
      queryClient.clear();
      navigate('/');
    },
  });
};
