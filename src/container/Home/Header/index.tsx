import { FC } from 'react';
import Image from 'next/image';

import { HeaderProps } from './props';

const Header: FC<HeaderProps> = props => {
  const { data } = props;

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <div className="mx-auto mt-20 mb-4 flex w-full max-w-sm flex-col items-center px-4 sm:px-6 lg:px-8">
      <div className="relative h-24 w-24 overflow-hidden rounded-full">
        <Image
          src={`${basePath}${data.page.avatar}`}
          alt={data.page.title}
          fill
          sizes="96px"
          priority
          style={{ objectFit: 'cover' }}
        />
      </div>
      <h1 className="mt-4 text-center text-4xl">{data.page.title}</h1>
    </div>
  );
};

export default Header;
