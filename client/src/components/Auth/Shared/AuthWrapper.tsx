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
    <div className="h-screen flex items-center justify-center bg-main ">
      <Card className="xl:w-1/4 md:w-1/2 shadow-md text-side">
        <CardHeader>
          <AuthHeader label={label} title={title}></AuthHeader>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="text-side">
          <BackButton href={backButtonHref} label={backButtonLabel}></BackButton>
        </CardFooter>
      </Card>
    </div>
  );
};
