import React from 'react';
import './App.css';
import { Grid } from '@material-ui/core';
import Form from './components/form/form';

function App() {
  return (
    <Grid container>
      <Grid item id="header" xs={12}>
        logo
      </Grid>
      <Grid item container id="form" xs={12} sm={6} justifyContent="center" alignItems="center">
        <Form />
      </Grid>
      <Grid item id="poster" xs={12} sm={6}>
        poster
      </Grid>
      <Grid item id="footer" xs={12}>
        footer
      </Grid>
    </Grid>
  );
}

export default App;
