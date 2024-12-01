import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthWrapper } from './Shared/AuthWrapper';
import { loginSchema } from '@/shared/schemas/auth';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel, Button, Input } from '@/components/ui';
import { useLoginUser } from '@/shared/queries/useAuth';

export const Login = () => {
  const { mutate, isSuccess } = useLoginUser();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = new URLSearchParams(location.search).get('redirect') || '/';

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    mutate(data, {
      onSuccess: () => {
        navigate(redirectTo);
      },
    });
  };

  return (
    <AuthWrapper label="Welcome back" title="Login" backButtonHref="/register" backButtonLabel="Don't have an account? Register!">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Enter your email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full bg-side" disabled={false}>
            Login
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};
