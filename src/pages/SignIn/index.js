import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './styles.css';
import useStyles from './styles';

import Logo from '../../assets/ocovid19-logo.png';
import api from '../../services/api';
import { login } from '../../services/auth';
import Header from '../../components/Header';
import { FiUser } from 'react-icons/fi';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

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
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  function validateEmail(mail) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    alert('Você preencheu um endereço de e-mail invávido!');
    return false;
  }

  async function handleSignIn(e) {
    e.preventDefault();
    if (email === '' || password === '') {
      setError('Preencha todos os dados para entrar');
    } else {
      if (validateEmail(email)) {
        try {
          const response = await api.post("api/v1/signin", { email, password });
          login(response.data.token);
          history.push('/');
        } catch (err) {
          console.log(err);
          setError('Erro ao efetuar o signin.');
        }
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Header />
      <div className={classes.paper}>
        <img src={Logo} alt="OC19 logo" width="150px" />
        <Typography component="h1" variant="h5">
          <FiUser size={25} /> Entrar
        </Typography>
        {error && <p id="error">{error}</p>}
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
          <Grid container>
            <Grid item xs>
              <Link to="#" variant="body2" className={'btn disabled'} >
                Esqueci a senha
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Copyright />
    </Container>
  );
}
