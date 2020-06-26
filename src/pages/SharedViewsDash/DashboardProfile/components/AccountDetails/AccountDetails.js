import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, CardContent, Divider, Grid, TextField } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
}));

const AccountDetails = (props) => {
  const { className, ...rest } = props;
  const name = localStorage.getItem('NAME');
  const email = localStorage.getItem('EMAIL');

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader subheader="Suas informações pessoais" title="Perfil" />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <TextField fullWidth label="Nome" margin="dense" name="firstName" value={name} variant="outlined" />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextField fullWidth label="Email" margin="dense" name="email" value={email} variant="outlined" />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
};

export default AccountDetails;
