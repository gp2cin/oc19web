import React from 'react';
import { FiMail, FiArrowRightCircle, FiInstagram } from 'react-icons/fi';

import './styles.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function WhoWeAre() {
  return (
    <div className="external-container">
      <Header />
      <div className="info-container row">
        <div className="about-container col-md-12">
          <h1> Plataforma OCovid-19 </h1>
          <span>
            A Plataforma OCovid19 é um aplicativo do Projeto Observatório COVID-19 que tem como objetivo monitorar de forma aberta a propagação da
            COVID-19 e seus impactos nos municípios de Pernambuco. Espera-se assim divulgar dados à população, como os casos suspeitos,
            confirmados, recuperados e óbitos, e também observações feitas pelos observadores do OCovid19. Além disso a plataforma conta com duas
            redes de observadores, a primeira é uma rede aberta de observadores que permite que qualquer cidadão relate casos suspeitos próximos a
            ele. E a segunda rede é uma rede fechada de observadores, onde observadores cadastrados são responsáveis pelos relatos dos casos do
            seu município.
          </span>
        </div>
        <div className="contact-us-container col-md-12">
          <h1> Fale Conosco </h1>
          <div className="contact-container col-md-7">
            <FiArrowRightCircle size={28} color="#b23137" /> <a rel="noopener noreferrer" target="_blank" href="https://www.cin.ufpe.br/~ocovid19">Site do projeto Observatório Covid-19</a>
          </div>
          <div className="contact-container col-md-7">
            <FiMail size={28} color="#b23137" /> <a href="mailto:ocovid19@cin.ufpe.br">ocovid19@cin.ufpe.br</a>
          </div>
          <div className="contact-container col-md-7">
            <FiInstagram size={28} color="#b23137" /> <a rel="noopener noreferrer" target="_blank" href="https://www.instagram.com/observatorio.covid.19/">@observatorio.covid.19</a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
