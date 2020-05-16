import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import Logo from '../../assets/ocovid19-logo.png';
import api from '../../services/api';
import { Form, Container } from './styles';
import Header from '../../components/Header';

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
        <Header />
        <Form onSubmit={this.handleSignIn}>
          <img src={Logo} alt="OC19 logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <div className="form-group row align-items-center">
            <label className="col-form-label"> Email </label>
            <input
              type={'email'}
              placeholder={'exemplo@email.com'}
              onChange={(e) => this.setState({ email: e.target.value })}
              className="form-control"
            />
          </div>
          <div className="form-group row align-items-center">
            <label className="col-form-label"> Senha </label>
            <input
              type={'password'}
              placeholder={'Senha'}
              onChange={(e) => this.setState({ password: e.target.value })}
              className="form-control"
            />
          </div>
          <button type={'submit'} className="btn btn-success align-self-center"><strong>Entrar</strong></button>
          <hr />
          <Link to="/">Esqueci a senha</Link>
        </Form>
      </Container>

    );
  }
}

export default withRouter(SignIn);
