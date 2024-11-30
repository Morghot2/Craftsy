import * as z from 'zod';

export const addServiceSchema = z.object({
  name: z.string().min(1, { message: 'Service name is required' }),
  description: z
    .string()
    .min(30, { message: 'Description must have at least 30 characters.' })
    .max(70, { message: 'Description must not exceed 70 characters' }),
  price: z.number().positive({ message: 'Price must be greater than 0' }).int({ message: 'Price must be an integer' }),
  category_id: z.string().min(1, { message: 'Category is required' }),
  photo: z.any().refine((file) => file instanceof FileList && file.length > 0, {
    message: 'Photo is required',
  }),
});
