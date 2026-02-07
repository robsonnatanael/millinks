import { FC } from 'react';
import Image from 'next/image';

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
      <Avatar sx={{ width: 96, height: 96, position: 'relative' }}>
        <Image
          src={data.page.avatar}
          alt={data.page.title}
          fill
          sizes="96px"
          priority
          style={{ objectFit: 'cover' }}
        />
      </Avatar>
      <Typography variant="h4" sx={{ mt: '1rem', textAlign: 'center' }}>
        {data.page.title}
      </Typography>
    </Container>
  );
};

export default Header;
