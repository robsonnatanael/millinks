import { FC } from 'react';

import { Button, Container } from '@mui/material';

import { LinksProps } from './props';
import useStyles from './styles';

export const Nav: FC<LinksProps> = ({ links }) => {
  const classes = useStyles();

  const buttons = links.map(link => {
    if (link.active) {
      return (
        <Button
          className={classes.btnLink}
          size="large"
          variant="contained"
          color="primary"
          key={link.id}
          href={link.url}
        >
          {link.name}
        </Button>
      );
    }
  });

  return (
    <Container maxWidth="sm" className={classes.root}>
      {buttons}
    </Container>
  );
};
