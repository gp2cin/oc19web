import React, { Component } from 'react';
import { HeaderMain } from './styles';
import Logo from '../../assets/ocovid19-logo-white.png';
import { Link } from 'react-router-dom';
export default class Header extends Component {
  render() {
    return (
      <HeaderMain>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-header">
          <Link to="#" className={'navbar-brand'}>
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
                <Link to="#" className={'navbar-brand'}>
                  {'Home'}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#" className={'navbar-brand'}>
                  {'Quem somos'}
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to="#" className={'navbar-brand'}>
                  {'Disabled'}
                </Link>
              </li> */}
            </ul>
          </div>
          <div className={'form-inline mt-2 mt-md-0'}>
            <button class="btn btn btn-outline-light my-2 my-sm-0" type="submit">
              Informar novo caso
            </button>
          </div>
        </nav>
      </HeaderMain>
    );
  }
}
