import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 16,
    '& a': {
      textTransform: 'none',
    },
    '& a + a': {
      marginTop: 16,
    },
  },

  btnLink: {
    width: '100%',
    minWidth: 327,
    height: 48,
  },
}));

export default useStyles;
