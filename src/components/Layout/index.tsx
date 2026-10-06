import { FC } from 'react';

import { LayoutProps } from './props';

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <main className="relative flex min-h-screen w-full flex-col pb-12">
      {children}
    </main>
  );
};

export default Layout;
