import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './styles.css';
import useStyles from './styles';

import Logo from '../../../assets/ocovid19-logo.png';
import api from '../../../services/api';
import { login } from '../../../services/auth';
import Header from '../../../components/Header';
import { FiUser } from 'react-icons/fi';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import CustomSnackBar from '../../../components/CustomSnackBar';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to="/" color="inherit">
        OCovid-19
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [snack, setSnack] = useState({ type: 'sucess', message: '' });
  const [openSnack, setOpenSnack] = useState(false);
  const [password, setPassword] = useState('');

  const history = useHistory();

  function validateEmail(mail) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }

    return false;
  }

  async function handleSignIn(e) {
    e.preventDefault();
    if (email === '' || password === '') {
      setSnack({ type: 'fail', message: 'Preencha todos os dados para entrar' });
      setOpenSnack(true);
    } else {
      if (validateEmail(email)) {
        try {
          const response = await api.post('api/v1/signin', { email, password });
          setSnack({ type: 'success', message: 'Login efetuado com sucesso' });
          setOpenSnack(true);
          login(response.data.token);
          setTimeout(() => history.push('/'), 3000);
        } catch (err) {
          console.log(err);
          setSnack({ type: 'error', message: 'Login ou senha incorreto, tente novamente' });
          setOpenSnack(true);
        }
      } else {
        setSnack({ type: 'error', message: 'Email incorreto' });
        setOpenSnack(true);
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Header />
      <CustomSnackBar open={openSnack} setOpen={setOpenSnack} message={snack.message} type={snack.type} />
      <div className={classes.paper}>
        <img src={Logo} alt="OC19 logo" width="150px" />
        <Typography component="h1" variant="h5">
          <FiUser size={25} /> Entrar
        </Typography>

        <form onSubmit={handleSignIn}>
          <div className={'form-group'}>
            <label className={'form-label'}>{'E-mail*'}</label>
            <input
              placeholder={'example@email.com'}
              className={'form-control'}
              value={email}
              type={'e-mail'}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className={'form-group'}>
            <label className={'form-label'}>{'Senha*'}</label>
            <input
              placeholder={'Senha'}
              className={'form-control'}
              type={'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <button className={'btn btn-success col-md-12'} type={'submit'}>
            {'Entrar'}
          </button>
          {/* <Grid container>
            <Grid item xs>
              <Link to="#" variant="body2" className={'btn disabled'}>
                Esqueci a senha
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
      <Copyright />
    </Container>
  );
}
