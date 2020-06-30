import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';

import { Formik } from 'formik';
import * as Yup from 'yup';
import api from '../../../../../services/api';
import CustomSnackBar from '../../../../../components/CustomSnackBar';

const useStyles = makeStyles(() => ({
  root: {},
}));

const schema = () =>
  Yup.object({
    newPassword: Yup.string().required('Nova senha é obrigatória'),
    repeatNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Senhas não parecidas')
      .required('Nova senha é obrigatória'),
  });

const ChangePassword = (props) => {
  const { className, ...rest } = props;

  // Snack
  const [snack, setSnack] = useState({ type: 'sucess', message: '' });
  const [openSnack, setOpenSnack] = useState(false);

  const classes = useStyles();

  const sendForm = async ({ newPassword }) => {
    const response = await api.put('api/v1/me/change-password', { password: newPassword });
    console.log(response);
    if (response.data.message === 'Password changed') {
      setSnack({ type: 'success', message: 'Senha trocada com sucesso' });
      setOpenSnack(true);
    }
  };

  return (
    <Formik
      initialValues={{ repeatNewPassword: '', newPassword: '' }}
      onSubmit={(values, { setSubmitting }) => {
        // alert(JSON.stringify(values, null, 2));

        console.log(values);
        sendForm(values)
      }}
      validationSchema={schema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit} autoComplete="off" noValidate>
          <CustomSnackBar open={openSnack} setOpen={setOpenSnack} message={snack.message} type={snack.type} />
          <Card {...rest} className={clsx(classes.root, className)}>
            <CardHeader title="Trocar a senha" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={!!(errors.newPassword && touched.newPassword && errors.newPassword !== '')}
                    margin="dense"
                    autoComplete='off'
                    label="Nova senha"
                    name="newPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.newPassword}
                    variant="outlined"
                    fullWidth
                  />
                  <Typography className="error-message" variant="subtitle2" style={{ color: 'red' }}>
                    {errors.newPassword && touched.newPassword && errors.newPassword}
                  </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={!!(errors.repeatNewPassword && touched.repeatNewPassword && errors.repeatNewPassword !== '')}
                    margin="dense"
                    autoComplete='off'
                    label="Repetir nova senha"
                    name="repeatNewPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.repeatNewPassword}
                    variant="outlined"
                    fullWidth
                  />
                  <Typography className="error-message" variant="subtitle2" style={{ color: 'red' }}>
                    {errors.repeatNewPassword && touched.repeatNewPassword && errors.repeatNewPassword}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions>
              <Button style={{ backgroundColor: '#b23137', color: 'white' }} variant="contained" type="submit">
                Trocar senha
              </Button>
            </CardActions>
          </Card>
        </form>
      )}
    </Formik>
  );
};

ChangePassword.propTypes = {
  className: PropTypes.string,
};

export default ChangePassword;
