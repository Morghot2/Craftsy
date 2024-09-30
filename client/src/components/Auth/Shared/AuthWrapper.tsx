import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { ReactNode } from 'react';
import { AuthHeader } from './AuthHeader';
import { BackButton } from './BackButton';

interface AuthWrapperProps {
  label: string;
  title: string;
  backButtonHref: string;
  backButtonLabel: string;
  children?: ReactNode;
}
export const AuthWrapper = ({ label, title, backButtonHref, backButtonLabel, children }: AuthWrapperProps) => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="xl:w-1/4 md:w-1/2 shadow-md">
        <CardHeader>
          <AuthHeader label={label} title={title}></AuthHeader>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
          <BackButton href={backButtonHref} label={backButtonLabel}></BackButton>
        </CardFooter>
      </Card>
    </div>
  );
};
