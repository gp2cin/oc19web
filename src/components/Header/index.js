import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { HeaderMain } from './styles';
import Logo from '../../assets/ocovid19-logo-white.png';
import { Link } from 'react-router-dom';
import { FiLogIn, FiHome, FiInfo, FiDatabase, FiUser } from 'react-icons/fi';
import { logout, isAuthenticated } from '../../services/auth';
export default class Header extends Component {

  state = {
    isAuth: isAuthenticated(),
    redirect: false
  }

  componentDidMount() {
    this.setState({ isAuth: isAuthenticated() });
  }

  handleLogout = () => {
    logout();
    this.setState({ isAuth: false })
    alert('Logout efetuado com sucesso.');
    this.setRedirect();
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  render() {
    return (
      < HeaderMain >
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
          {
            !this.state.isAuth ?
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <Link to="/" className={'navbar-brand'}>
                      <FiHome size={22} /> {'Home'}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/official-cases" className={'navbar-brand'}>
                      <FiDatabase size={22} /> {'Dados oficiais'}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/about-us" className={'navbar-brand'}>
                      <FiInfo size={22} /> {'Quem somos'}
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link to="/signup" className={'navbar-brand'}>
                      <FiUserPlus size={22} /> {'Sign Up'}
                    </Link>
                  </li> */}
                </ul>
              </div> : <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <Link to="/" className={'navbar-brand'}>
                      <FiHome size={22} /> {'Home'}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/official-cases" className={'navbar-brand'}>
                      <FiDatabase size={22} /> {'Dados oficiais'}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/about-us" className={'navbar-brand'}>
                      <FiInfo size={22} /> {'Quem somos'}
                    </Link>
                  </li>
                </ul>
              </div>
          }

          {
            this.state.isAuth ?
              <div className={'form-inline mt-2 mt-md-0 mr-10'}>
                <Link to="/my-account" className={'btn text-light'}>
                  <FiUser size={20} /> Minha conta
                </Link>
                <Link to="/observer-report" className={'btn btn btn-outline-light my-2 my-sm-0'}>
                  {'Cadastrar Observação'}
                </Link>
              </div> :
              <div className={'form-inline mt-2 mt-md-0 mr-10'}>
                <Link to="/signin" className={'btn text-light'}>
                  <FiLogIn size={20} /> {'Sign In'}
                </Link>
                <Link to="/warnings/new" className={'btn btn btn-outline-light my-2 my-sm-0'}>
                  {'Informar novo caso'}
                </Link>
                <div></div>
              </div>
          }
        </nav>
      </HeaderMain >
    );
  }
}
