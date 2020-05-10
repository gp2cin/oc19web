import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import Logo from '../../assets/ocovid19-logo.png';
import api from '../../services/api';
import { Form, Container } from './styles';

class SignIn extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    error: '',
  };

  handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: 'Preencha todos os dados para entrar' });
    } else {
      try {
        await api.post('/users', { email, password });
        this.props.history.push('/');
      } catch (err) {
        console.log(err);
        this.setState({ error: 'Ocorreu um erro ao registrar sua conta.' });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignIn}>
          <img src={Logo} alt="OC19 logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type={'email'}
            placeholder={'Endereço de e-mail'}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <input
            type={'password'}
            placeholder={'Senha'}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <button type={'submit'}>Entrar</button>
          <hr />
          <Link to="/">Esqueci a senha</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignIn);
