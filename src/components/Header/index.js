import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { HeaderMain } from './styles';
import Logo from '../../assets/ocovid19-logo-white.png';
import { Link } from 'react-router-dom';
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
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-header">
          <Link to="/" className={'navbar-brand'}>
            <img src={Logo} className={'navbar-logo'} alt="OC19 logo" />
          </Link>

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
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to="/" className={'navbar-brand'}>
                  {'Home'}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/official-cases" className={'navbar-brand'}>
                  {'Dados oficiais'}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about-us" className={'navbar-brand'}>
                  {'Quem somos'}
                </Link>
              </li>
              {
                this.state.isAuth ?
                  <li className="nav-item">
                    <Link to="/observer-report" className={'navbar-brand'}>
                      {'Cadastrar Observação'}
                    </Link>
                  </li> : <div></div>
              }
              {
                !this.state.isAuth ?
                  <div>
                    <li className="nav-item">
                      <Link to="/signin" className={'navbar-brand'}>
                        {'SignIn'}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/signup" className={'navbar-brand'}>
                        {'SignUn'}
                      </Link>
                    </li>
                  </div> : <div></div>
              }
              {/* <li className="nav-item">
                <Link to="#" className={'navbar-brand'}>
                  {'Disabled'}
                </Link>
              </li> */}
            </ul>
          </div>
          {
            this.state.isAuth ?
              <button onClick={this.handleLogout}>Sair</button> : <div></div>
          }
          <div className={'form-inline mt-2 mt-md-0'}>
            <Link to="/warnings/new" className={'btn btn btn-outline-light my-2 my-sm-0'}>
              {'Informar novo caso'}
            </Link>
          </div>
        </nav>
      </HeaderMain >
    );
  }
}
