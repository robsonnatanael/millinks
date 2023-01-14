import { FC } from 'react';

import { Avatar, Container, Typography } from '@mui/material';

import { HeaderProps } from './props';
import useStyles from './styles';

export const Header: FC<HeaderProps> = ({ title, avatar }) => {
  const classes = useStyles();

  const imgUrl = `${process.env.cms}${avatar}`;

  return (
    <Container maxWidth="sm" className={classes.root}>
      <div className={classes.avatar}>
        <Avatar src={imgUrl} sx={{ width: 96, height: 96 }} alt="" />
      </div>
      <Typography variant={'h4'} className={classes.title}>
        {title}
      </Typography>
    </Container>
  );
};
