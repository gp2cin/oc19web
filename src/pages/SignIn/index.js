import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import Logo from '../../assets/ocovid19-logo.png';
import api from '../../services/api';
import { login } from '../../services/auth';
import { Form, Container } from './styles';

export default function SignIn() {

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
          alert('Login efetuado com sucesso.');
          history.push('/');
        } catch (err) {
          console.log(err);
          setError('Ocorreu um erro ao registrar sua conta.');
        }
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSignIn}>
        <img src={Logo} alt="OC19 logo" />
        {error && <p>{error}</p>}
        <input
          type={'email'}
          placeholder={'Endereço de e-mail'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={'password'}
          placeholder={'Senha'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type={'submit'}>Entrar</button>
        <hr />
        <Link to="/">Esqueci a senha</Link>
      </Form>
    </Container>
  );
}
