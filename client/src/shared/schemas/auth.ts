import * as z from 'zod';

const loginSchema = z.object({
  email: z.string().email({
    message: 'Invalid email format',
  }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});

const registerSchema = z.object({
  email: z.string().email({
    message: 'Invalid email format',
  }),
  username: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});

const becomeSellerSchema = z.object({
  bio: z.string().min(50, { message: 'Bio must be at least 50 characters long' }).max(200, { message: 'Bio must not exceed 200 characters' }),
  country: z.string().min(2, { message: 'Country must be specified' }),
  phone: z.string().min(7, { message: 'Phone must be at least 7 digits long' }),
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  surname: z.string().min(2, { message: 'Surname must be at least 2 characters long' }),
});

export { loginSchema, registerSchema, becomeSellerSchema };
