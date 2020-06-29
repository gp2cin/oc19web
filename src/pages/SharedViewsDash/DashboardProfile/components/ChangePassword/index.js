import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, CardContent, CardActions, Divider, Grid, Button, TextField } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
}));

const ChangePassword = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    firstName: 'Shen',
    lastName: 'Zhi',
    email: 'shen.zhi@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" noValidate>
        <CardHeader title="Trocar a senha" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Senha nova"
                margin="dense"
                name="newPassword"
                onChange={handleChange}
                required
                value={values.newPassword}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Repita senha nova"
                margin="dense"
                name="repeatNewPassword"
                onChange={handleChange}
                required
                value={values.repeatNewPassword}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Senha antiga"
                margin="dense"
                name="lastPassword"
                onChange={handleChange}
                required
                value={values.lastPassword}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button style={{ backgroundColor: '#b23137', color: 'white' }} variant="contained">
            Trocar senha
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

ChangePassword.propTypes = {
  className: PropTypes.string,
};

export default ChangePassword;
