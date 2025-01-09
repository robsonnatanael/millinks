import { FC, memo } from 'react';

import { LayoutProps } from './props';
import useStyles from './styles';

const Layout: FC<LayoutProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <main className={classes.root}>{children}</main>
    </>
  );
};

export default memo(Layout);
