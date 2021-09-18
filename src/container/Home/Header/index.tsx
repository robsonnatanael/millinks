import React, { FC } from 'react';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { HeaderProps } from './props';
import useStyles from './styles';

const Header: FC<HeaderProps> = props => {
  const { data } = props;
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.root}>
      <div className={classes.avatar}>
        <Avatar src={data.page.avatar} sx={{ width: 96, height: 96 }} />
      </div>
      <Typography variant={'h4'} className={classes.title}>
        {data.page.title}
      </Typography>
    </Container>
  );
};

export default Header;
