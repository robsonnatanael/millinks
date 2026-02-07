'use client';

import { Button, Container } from '@mui/material';

import { LinksProps } from './props';

const Nav = (props: LinksProps) => {
  const { links } = props;

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {links.map(link => (
        <Button
          key={link.id}
          href={link.url}
          size="large"
          variant="contained"
          color="primary"
          sx={{
            my: '10px',
            textTransform: 'none',
          }}
        >
          {link.title}
        </Button>
      ))}
    </Container>
  );
};

export default Nav;
