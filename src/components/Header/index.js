import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { HeaderMain } from './styles';
import Logo from '../../assets/ocovid19-logo-white.png';
import { Link } from 'react-router-dom';
import { FiLogIn, FiHome, FiInfo, FiDatabase, FiUser, FiUserPlus, FiLogOut } from 'react-icons/fi';
import { logout, isAuthenticated } from '../../services/auth';
import CustomSnackBar from '../CustomSnackBar';

export default class Header extends Component {
  state = {
    isAuth: isAuthenticated(),
    redirect: false,
    // snackbar
    snack: { type: 'success', message: '' },
    openSnack: false,
  };

  getUsername = () => localStorage.getItem('NAME');

  componentDidMount() {
    this.setState({ isAuth: isAuthenticated() });
  }

  handleLogout = () => {
    this.setState({ isAuth: false });
    this.setState({ snack: { message: 'Deslogado com sucesso' }, openSnack: true });
    logout();

    setTimeout(() => this.setRedirect(), 3000);
  };

  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  render() {
    const { snack, openSnack } = this.state;
    return (
      <HeaderMain>
        <CustomSnackBar
          open={openSnack}
          setOpen={(value) => this.setState({ openSnack: value })}
          message={snack.message}
          type={snack.type}
        />
        <div>{this.renderRedirect()}</div>
        <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-header">
          <button
            type="button"
            aria-expanded="false"
            data-toggle="collapse"
            className="navbar-toggler"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link to="/" className={'navbar-brand'}>
            <img src={Logo} className={'navbar-logo'} alt="OC19 logo" />
          </Link>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to="/" className={'navbar-brand'}>
                  <FiHome size={22} /> {'Home'}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/official-cases" className={'navbar-brand'}>
                  <FiDatabase size={22} /> {'Dados'}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about-us" className={'navbar-brand'}>
                  <FiInfo size={22} /> {'Sobre'}
                </Link>
              </li>
            </ul>
          </div>

          {this.state.isAuth ? (
            <div className={'form-inline mt-2 mt-md-0 mr-10'}>
              <div className="dropdown mr-2">
                <button
                  className="btn text-light dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Olá, {this.getUsername()}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <Link to="/my-account" className={'btn dropdown-item'}>
                    <FiUser size={20} /> {'Minha conta'}
                  </Link>
                  <button className={'btn dropdown-item'} onClick={this.handleLogout}>
                    <FiLogOut /> {'Sair'}
                  </button>
                </div>
              </div>
              <div>
                <Link to="/observer-report" className={'btn btn btn-outline-light my-2 my-sm-0'}>
                  {'Cadastrar Observação'}
                </Link>
              </div>
            </div>
          ) : (
            <div className={'form-inline mt-2 mt-md-0 mr-10'}>
              <div className={'mr-2'}>
                <Link to="/signin" className={'btn text-light'} type="button">
                  <FiLogIn size={20} /> {'Entrar'}
                </Link>
              </div>
              <div className={'mr-2'}>
                <Link to="/signup" className={'btn text-light'} type="button">
                  <FiUserPlus size={22} /> {'Cadastre-se'}
                </Link>
              </div>
              <div className={'mr-2'}>
                <Link to="/warnings/new" className={'btn btn btn-outline-light my-2 my-sm-0'} type="button">
                  {'Fazer auto observação'}
                </Link>
              </div>
              <div>
                <Link to="/general-observation" className={'btn btn btn-outline-light my-2 my-sm-0'} type="button">
                  {'Cadastrar Observação'}
                </Link>
              </div>
            </div>
          )}
        </nav>
      </HeaderMain>
    );
  }
}
