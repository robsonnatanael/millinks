'use client';
import { FC } from 'react';

import { Avatar, Container, Typography } from '@mui/material';

import { HeaderProps } from './props';

const Header: FC<HeaderProps> = props => {
  const { data } = props;

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: '5rem',
        mb: '1rem',
      }}
    >
      <Avatar src={data.page.avatar} sx={{ width: 96, height: 96 }} />
      <Typography variant="h4" sx={{ mt: '1rem', textAlign: 'center' }}>
        {data.page.title}
      </Typography>
    </Container>
  );
};

export default Header;
