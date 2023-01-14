import { FC } from 'react';

import Image from 'next/image';

import { Container } from '@mui/material';

import { FooterProps } from './props';
import useStyles from './styles';

export const Footer: FC<FooterProps> = ({ footer }) => {
  const classes = useStyles();
  const imgUrl = footer.logo.data.attributes.url
    ? `${process.env.cms}${footer.logo.data.attributes.url}`
    : null;

  return (
    <footer className={classes.root}>
      <Container className={classes.containerFooter}>
        <a
          href={footer?.link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          {footer.description}
          {imgUrl && (
            <Image src={imgUrl} alt={footer.link.name} width={84} height={17} />
          )}
        </a>
      </Container>
    </footer>
  );
};
