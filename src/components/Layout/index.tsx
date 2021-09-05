import React, { FC, memo } from "react";
import { LayoutProps } from "./props";
import useStyles from './styles';

const Layout: FC<LayoutProps> = (props) => {
  const classes = useStyles();

  return (
    <>
      <main className={classes.root}>{props.children}</main>
    </>
  );
};

export default memo(Layout);
