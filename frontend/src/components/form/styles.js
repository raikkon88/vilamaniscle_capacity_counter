import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  card: {
    padding: 21,
    margin: 21,
  },
  formItem: {
    margin: 13,
  },
  slider: {
    minWidth: '80%',
  },
  button: {
    marginTop: 8,
    maxWidth: 200,
  },
  alert: {
    padding: 8,
  },
}));

export default useStyles;
