import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  header: {
    padding: 35,
  },
  logo: {
    maxWidth: '70%',
  },
  poster: {
    maxHeight: 800,
    maxWidth: 500,
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
  },
}));

export default useStyles;
