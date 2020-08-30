import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {},
});

export default function () {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item></Grid>
    </Grid>
  );
}
