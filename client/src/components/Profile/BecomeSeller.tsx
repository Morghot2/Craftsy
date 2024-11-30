import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { becomeSellerSchema } from '@/shared/schemas/auth';
import { useBecomeSeller } from '@/shared/queries/useBecomeSeller';
import { useQueryClient } from '@tanstack/react-query';

export const BecomeSeller = ({ isOpen, onClose, defaultValues = {} }) => {
  const queryClient = useQueryClient(); // Access react-query cache
  const { mutate, isLoading } = useBecomeSeller();

  const form = useForm({
    resolver: zodResolver(becomeSellerSchema),
    defaultValues: {
      bio: '',
      country: '',
      phone: '',
      name: '',
      surname: '',
      ...defaultValues, // Prepopulate form with existing data
    },
  });

  useEffect(() => {
    form.reset(defaultValues); // Reset form when modal opens with new data
  }, [defaultValues, form]);

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(['userProfile']); // Invalidate query to refetch user data
        onClose();
      },
      onError: (error) => {
        console.error('Error becoming seller:', error);
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg">
        <h2 className="font-bold text-2xl text-[#224f34] mb-4">{defaultValues.name ? 'Edit Profile' : 'Become a Seller'}</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block font-semibold">Name:</label>
            <input {...form.register('name')} className="border border-gray-300 rounded p-2 w-full" placeholder="Enter your name" />
            <p className="text-red-500 text-sm">{form.formState.errors.name?.message}</p>
          </div>
          <div>
            <label className="block font-semibold">Surname:</label>
            <input {...form.register('surname')} className="border border-gray-300 rounded p-2 w-full" placeholder="Enter your surname" />
            <p className="text-red-500 text-sm">{form.formState.errors.surname?.message}</p>
          </div>
          <div>
            <label className="block font-semibold">Bio:</label>
            <textarea {...form.register('bio')} className="border border-gray-300 rounded p-2 w-full" placeholder="Tell us about yourself" />
            <p className="text-red-500 text-sm">{form.formState.errors.bio?.message}</p>
          </div>
          <div>
            <label className="block font-semibold">Country:</label>
            <input {...form.register('country')} className="border border-gray-300 rounded p-2 w-full" placeholder="Enter your country" />
            <p className="text-red-500 text-sm">{form.formState.errors.country?.message}</p>
          </div>
          <div>
            <label className="block font-semibold">Phone:</label>
            <input {...form.register('phone')} className="border border-gray-300 rounded p-2 w-full" placeholder="Enter your phone number" />
            <p className="text-red-500 text-sm">{form.formState.errors.phone?.message}</p>
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-300 rounded-lg hover:bg-gray-400">
              Cancel
            </button>
            <button type="submit" className="py-2 px-4 bg-[#224f34] text-white rounded-lg hover:bg-[#1a3d28]" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
