import React from 'react';
import './App.css';
import { Grid } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Form from './components/form/form';
import vilamaniscleLogo from './images/vilamaniscle_new.svg';
import poster from './images/poster.jpg';
import splashLogo from './images/logoSplash.png';
import vilamaniscleIsoLogo from './images/vilamaniscle_old.svg';
import styles from './styles';

const THEME = createMuiTheme({
  typography: {
    fontFamily: '"Helvetica", "Arial", sans-serif',
    fontSize: 21,
  },
  palette: {
    primary: {
      main: '#931E32',
    },
  },
});

function App() {
  const classes = styles();
  return (
    <MuiThemeProvider theme={THEME}>
      <Grid container>
        <Grid className={classes.header} item id="header" xs={12} container justifyContent="center" alignItems="center">
          <img className={classes.logo} src={vilamaniscleLogo} alt="Imatge sobre la marca comercial de vilamaniscle" />
        </Grid>
        <Grid item container id="form" xs={12} sm={6} justifyContent="center" alignItems="center" direction="column">
          <Form />

          <img className={classes.splashLogo} src={splashLogo} alt="Imatge sobre la marca comercial de l'empresa Splash" />
          <img className={classes.oldLogo} src={vilamaniscleIsoLogo} alt="Imatge sobre el iso logo tip del poble de vilamaniscle" />

        </Grid>
        <Grid item id="poster" xs={12} sm={6} container justifyContent="center" alignItems="center">
          <img className={classes.poster} src={poster} alt="Imatge sobre la programació de concerts a vilamaniscle" />
        </Grid>

      </Grid>
    </MuiThemeProvider>
  );
}

export default App;
