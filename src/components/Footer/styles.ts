import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '3rem',
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
  },
  containerFooter: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 12,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default useStyles;
