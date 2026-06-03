import { LinksProps } from './props';
import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';

const Nav = (props: LinksProps) => {
  const { links } = props;

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col px-4 sm:px-6 lg:px-8">
      {links.map(link => (
        <Button key={link.id} asChild size="lg" className="my-2.5 normal-case">
          <Link href={link.url} target="_blank" rel="noopener noreferrer">
            {link.title}
          </Link>
        </Button>
      ))}
    </div>
  );
};

export default Nav;
