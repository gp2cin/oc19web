import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { AccountDetails, ChangePassword } from './components';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 600,
  },
}));

const DashboardProfile = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4} direction="column">
        <Grid item>
          <AccountDetails variant="outlined" />
        </Grid>
        <Grid item>
          <ChangePassword variant="outlined" />
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardProfile;
