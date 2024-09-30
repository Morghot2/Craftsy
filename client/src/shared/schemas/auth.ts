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

export { loginSchema, registerSchema };
