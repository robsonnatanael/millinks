import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5rem',
    marginBottom: '1rem',
  },
  avatar: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
  },
}));

export default useStyles;
