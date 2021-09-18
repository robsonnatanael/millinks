import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minHeight: '100vh',
    position: 'relative',
    paddingBottom: '3rem',
  },
}));

export default useStyles;
