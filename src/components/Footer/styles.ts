import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '3rem',
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerFooter: {
    fontSize: 12,
    maxWidth: 240,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default useStyles;
