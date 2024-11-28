import { useForm, Controller } from 'react-hook-form';
import { BecomeSellerProps } from './Profile.utils';

export const BecomeSeller = ({ isOpen, onClose, defaultValues }: BecomeSellerProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues,
  });

  const onSubmit = (data) => {
    console.log('Updated Data:', data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg">
        <h2 className="font-bold text-2xl text-[#224f34] mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <p className="text-gray-700 font-semibold">Bio:</p>
            <Controller
              name="bio"
              control={control}
              render={({ field }) => (
                <textarea {...field} placeholder="Tell us about yourself" className="border border-gray-300 p-2 rounded mt-2 w-full" />
              )}
            />
          </div>
          <div className="mb-4">
            <p className="text-gray-700 font-semibold">Country:</p>
            <Controller
              name="country"
              control={control}
              render={({ field }) => <input {...field} placeholder="Enter your country" className="border border-gray-300 p-2 rounded mt-2 w-full" />}
            />
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
              Cancel
            </button>
            <button type="submit" className="py-2 px-4 bg-[#224f34] text-white rounded-lg hover:bg-[#1a3d28]">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
