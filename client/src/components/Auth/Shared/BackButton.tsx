import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
interface BackButtonProps {
  href: string;
  label: string;
}
export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button variant="link" className="w-full font-normal tex-third" asChild size="sm">
      <Link to={href}>{label}</Link>
    </Button>
  );
};
