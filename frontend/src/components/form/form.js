import React from 'react';
import {
  Card,
  TextField,
  Grid,
  Button,
  Slider,
  Typography,
} from '@material-ui/core';
import useStyles from './styles';

const Form = () => {
  const classes = useStyles();

  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [counter, setCounter] = React.useState(0);

  const printPeopleValue = (value) => {
    setCounter(value);
    return `${value} persones`;
  };

  const send = () => {
    console.log(`${name} - ${phone} - ${counter}`);
  };

  return (
    <Card className={classes.card}>
      <form>
        <Grid container direction="column" alignItems="center">
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
            <Typography id="typographySlider-counter">Nombre de persones</Typography>
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
      </form>
    </Card>
  );
};

export default Form;
