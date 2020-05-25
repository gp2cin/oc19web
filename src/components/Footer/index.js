import React, { Component } from 'react';
import { FooterMain } from './styles';
import Logo from '../../assets/ocovid19-logo.png';
import GP2Logo from '../../assets/gp2-logo.png';
import UFPELogo from '../../assets/ufpe-logo.png';
import CinLogo from '../../assets/cin-logo.png';
import IRRDLogo from '../../assets/irrd-logo.png';
export default class Footer extends Component {
  render() {
    return (
      <FooterMain className={'pt-4 my-md-5 pt-md-5 border-top col-md-12'}>
        <div className={'row col-md-12 footer-group'}>
          <div className="col-12 col-md-3">
            <img src={Logo} alt="Obervatory brand" className={'logo-footer'} />
            <small className="d-block mb-3 text-muted">{'Version 0.1.0 © 2020'}</small>
          </div>
          <div className={'col-3 col-md-3 row'}>
            <h6 className={'col-md-12'}>{'Desenvolvimento'}</h6>
            <div className={'col-md-12'}>
              <a href={'https://cin.ufpe.br/~gp2'} target={'_blank'} rel={'noopener noreferrer'}>
                <img src={GP2Logo} className={'logo-footer'} alt="GP2 brand" />
              </a>
            </div>
          </div>
          <div className="col-9 col-md-6 row">
            <h6 className={'col-md-12'}>{'Parceiros'}</h6>
            <div className={'col-md-2'}>
              <a href={'https://www.ufpe.br'} target={'_blank'} rel={'noopener noreferrer'}>
                <img src={UFPELogo} className={'logo-footer'} alt="UFPE brand" />
              </a>
            </div>
            <div className={'col-md-6'}>
              <a href={'https://cin.ufpe.br'} target={'_blank'} rel={'noopener noreferrer'}>
                <img src={CinLogo} className={'logo-footer'} alt="Cin brand" />
              </a>
            </div>
            <div className={'col-md-4'}>
              <a href={'https://irrd.org'} target={'_blank'} rel={'noopener noreferrer'}>
                <img src={IRRDLogo} className={'logo-footer'} alt={'IRRD brand'} />
      
              </a>
            </div>
          </div>
        </div>
      </FooterMain>
    );
  }
}
