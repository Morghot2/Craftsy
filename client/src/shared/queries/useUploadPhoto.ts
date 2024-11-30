import { useMutation } from '@tanstack/react-query';
import { post } from '../../services/apiClient';

export const uploadPhotoApi = async (formData: FormData) => {
  return post('/users/upload-photo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const useUploadPhoto = () => {
  return useMutation({
    mutationFn: uploadPhotoApi,
    mutationKey: ['uploadPhoto'],
  });
};
