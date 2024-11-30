import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { infer as ZodInfer } from 'zod';
import { becomeSellerSchema } from '@/shared/schemas/auth';
import { useBecomeSeller } from '@/shared/queries/useBecomeSeller';
import { useQueryClient } from '@tanstack/react-query';

type BecomeSellerProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: Partial<ZodInfer<typeof becomeSellerSchema>>;
};

export const BecomeSeller: React.FC<BecomeSellerProps> = ({ isOpen, onClose, defaultValues = {} }) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useBecomeSeller();

  type FormValues = ZodInfer<typeof becomeSellerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(becomeSellerSchema),
    defaultValues: {
      bio: '',
      country: '',
      phone: '',
      name: '',
      surname: '',
      ...defaultValues,
    },
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['userProfile'] });
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
        <h2 className="font-bold text-2xl text-[#224f34] mb-4">{defaultValues?.name ? 'Edit Profile' : 'Become a Seller'}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block font-semibold">Name:</label>
            <input
              {...register('name')}
              className={`border rounded p-2 w-full ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block font-semibold">Surname:</label>
            <input
              {...register('surname')}
              className={`border rounded p-2 w-full ${errors.surname ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your surname"
            />
            {errors.surname && <p className="text-red-500 text-sm">{errors.surname.message}</p>}
          </div>
          <div>
            <label className="block font-semibold">Bio:</label>
            <textarea
              {...register('bio')}
              className={`border rounded p-2 w-full ${errors.bio ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Tell us about yourself"
            />
            {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
          </div>
          <div>
            <label className="block font-semibold">Country:</label>
            <input
              {...register('country')}
              className={`border rounded p-2 w-full ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your country"
            />
            {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
          </div>
          <div>
            <label className="block font-semibold">Phone:</label>
            <input
              {...register('phone')}
              className={`border rounded p-2 w-full ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
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
