import { FC } from 'react';

import { Box } from '@mui/material';

import { LayoutProps } from './props';

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      component="main"
      sx={{
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        pb: '3rem',
      }}
    >
      {children}
    </Box>
  );
};

export default Layout;
