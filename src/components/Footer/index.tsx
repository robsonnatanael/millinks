'use client';

import Image from 'next/image';

import { Box, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        height: '3rem',
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: 12,
        }}
      >
        <Box
          component="a"
          href="https://www.robsonnatanael.com.br"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          Desenvolvido por
          <Box component="span" sx={{ ml: 1, display: 'flex' }}>
            <Image
              src="/assets/images/footer/logo-robson-natanael.svg"
              alt="logo Robson Natanael"
              width={84}
              height={17}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
