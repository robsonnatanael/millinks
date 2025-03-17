'use client';
import { Button, Container } from '@mui/material';

import { LinksProps } from './props';
import useStyles from './styles';

const Nav = (props: LinksProps) => {
  const { links } = props;
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.root}>
      {links.map(link => (
        <Button
          className={classes.btnLink}
          size="large"
          variant="contained"
          color="primary"
          key={link.id}
          href={link.url}
        >
          {link.title}
        </Button>
      ))}
    </Container>
  );
};

export default Nav;
