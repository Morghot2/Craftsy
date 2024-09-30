import { AuthWrapper } from './Shared/AuthWrapper';

export const Login = () => {
  return <AuthWrapper label="Log in" title="Login" backButtonHref="/register" backButtonLabel="Dont have an account yet? Register!"></AuthWrapper>;
};
