import React, { useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useAddService } from '@/shared/queries/useService';
import { useCategories } from '@/shared/queries/useCategories';
import { zodResolver } from '@hookform/resolvers/zod';
import { addServiceSchema } from '@/shared/schemas/services';

interface Category {
  id: string;
  name: string;
}

interface AddServiceFormValues {
  name: string;
  description: string;
  price: number;
  category_id: string;
  photo: FileList;
}

export const AddServiceModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { data: categories } = useCategories();
  const { mutate: addService } = useAddService();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof addServiceSchema>>({
    resolver: zodResolver(addServiceSchema),
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setPhotoPreview(null);
    }
  };

  const onSubmit = (data: AddServiceFormValues) => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('category_id', data.category_id);

    if (data.photo && data.photo.length > 0) {
      formData.append('photo', data.photo[0]);
    } else {
      console.error('No photo selected!');
      return;
    }

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    addService(formData, {
      onSuccess: () => {
        reset();
        setPhotoPreview(null);
        onClose();
      },
      onError: (error: any) => {
        console.error('Failed to add service:', error);
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg">
        <h2 className="font-bold text-2xl text-[#224f34] mb-4">Add a Service</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold">Name:</label>
            <input
              {...register('name', { required: 'Service name is required' })}
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Service Name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block font-semibold">Description:</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Description"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
          <div>
            <label className="block font-semibold">Price:</label>
            <input
              {...register('price', {
                required: 'Price is required',
                valueAsNumber: true,
                min: { value: 1, message: 'Price must be greater than 0' },
              })}
              type="number"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Price"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>
          <div>
            <label className="block font-semibold">Category:</label>
            <select {...register('category_id', { required: 'Category is required' })} className="border border-gray-300 rounded p-2 w-full">
              <option value="">Select Category</option>
              {categories?.map((category: Category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id.message}</p>}
          </div>
          <div>
            <label className="block font-semibold">Photo:</label>
            <div
              className="relative w-full h-52 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer bg-gray-100 hover:bg-gray-200"
              onClick={() => document.getElementById('service-photo-upload')?.click()}
            >
              <input
                id="service-photo-upload"
                type="file"
                accept="image/*"
                {...register('photo', { required: 'Photo is required' })}
                className="absolute w-full h-full opacity-0 cursor-pointer"
                onChange={handlePhotoChange}
              />
              {photoPreview ? (
                <img src={photoPreview} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <p className="text-gray-500">Click to Upload Photo</p>
              )}
            </div>
            {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                reset();
                setPhotoPreview(null);
                onClose();
              }}
              className="py-2 px-4 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
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
