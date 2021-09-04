import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },

  btnLink: {
    margin: '10px 0',
    textTransform: 'none',
  }
}));

export default useStyles;
