import React from 'react';
import {
  Card,
  TextField,
  Grid,
  Button,
  Slider,
  Typography,

} from '@material-ui/core';
import {
  Alert,
  AlertTitle,
} from '@material-ui/lab';
import useStyles from './styles';
import Api from '../../api/axiosApi';

const Form = () => {
  const classes = useStyles();

  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [counter, setCounter] = React.useState(0);
  const [globalCounter, setGlobalCounter] = React.useState(0);
  const [capacity, setCapacity] = React.useState(0);
  const [alert, setAlert] = React.useState('');

  const printPeopleValue = React.useCallback((value) => {
    setCounter(value);
    return `${value} persones`;
  }, []);

  React.useEffect(async () => {
    const { data: { count: numberOfInscriptions } } = await Api.getInscriptionNumber();
    setGlobalCounter(numberOfInscriptions);

    const { data: { capacity: totalCapacity } } = await Api.getCapacity();
    setCapacity(totalCapacity);
  }, [setGlobalCounter]);

  const send = React.useCallback(async () => {
    try {
      await Api.addInscription(name, phone, counter);
      setGlobalCounter((prev) => prev + counter);
      setAlert({ status: 'success', message: 'La teva inscripció s\'ha realitzat correctament.' });
    } catch (err) {
      setAlert({ status: 'error', message: err.response.data.error });
    }
  }, [name, phone, counter]);

  if (alert?.status !== 'success' && globalCounter === capacity && globalCounter !== 0) {
    return (
      <Typography>S&apos;han exhaurit les inscripcions, no ens queden places.</Typography>
    );
  }

  return (
    <Card className={classes.card}>
      <Typography variant="h4" color="primary">Inscriu-te!</Typography>
      <Typography
        className={classes.text}
      >
        {`Existeixen ${capacity - globalCounter} places lliures.`}
      </Typography>
      <form>
        <Grid container direction="column" alignItems="center">
          { (!alert || alert?.status !== 'success') && (
            <Grid item container direction="column">
              <TextField
                className={classes.formItem}
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                id="textField-name"
                variant="outlined"
                label="Nom i cognoms"
                required
              />
              <TextField
                className={classes.formItem}
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
                id="textField-phone"
                variant="outlined"
                label="Telèfon"
                required
              />
              <Grid className={classes.slider}>
                <Typography id="typographySlider-counter">
                  Nombre de persones (
                  {counter}
                  )
                </Typography>
                <Slider
                  defaultValue={1}
                  aria-labelledby="typographySlider-counter"
                  getAriaValueText={printPeopleValue}
                  valueLabelDisplay="auto"
                  marks
                  min={1}
                  max={10}
                  step={1}
                />
              </Grid>
              <Button
                className={classes.button}
                onClick={send}
                variant="outlined"
              >
                Inscriu-me!
              </Button>
            </Grid>
          )}

          { alert && (
            <Alert severity={alert.status} className={classes.alert}>
              <AlertTitle>{alert.status}</AlertTitle>
              {alert.message && <Typography>{alert.message}</Typography>}
              {alert.status !== 'error' && <strong>Gràcies!!</strong> }
            </Alert>
          )}
        </Grid>
      </form>
    </Card>
  );
};

export default Form;
