import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5rem',
    marginBottom: '1rem',
  },
  avatar: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginTop: '1rem',
  },
}));

export default useStyles;
