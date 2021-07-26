import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  header: {
    padding: 35,
  },
  logo: {
    maxWidth: '70%',
  },
  poster: {
    maxHeight: 600,
    marginBottom: 21,
  },
  footer: {
    margin: 35,
  },
  splashLogo: {
    width: 200,
    padding: 21,
  },
  oldLogo: {
    padding: 21,
    width: 250,
    marginBottom: 21,
  },
}));

export default useStyles;
