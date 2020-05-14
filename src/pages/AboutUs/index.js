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
          <h1> Sobre </h1>
          <span>
            A plataforma OCovid-19 é um aplicativo do projeto Observatório Covid-19 que tem
            como objetivo monitorar a propagação do vírus nos municípios de Pernambuco para
            que assim possamos divulgar dados oficias à população, como os casos suspeitos,
            confirmados, recuperados e óbtios. Além disso a plataforma conta com duas redes
            de observadores, a primeira é uma rede aberta de observadores que permite que o
            cidadão relate casos suspeitos próximos a ele. E a segunda é uma rede fechada de
            observadores, onde observadores cadastrados são responsáveis pelos relatos dos
            casos na região que reside.
          </span>
        </div>
        <div className="contact-us-container col-md-12">
          <h1> Fale Conosco </h1>
          <div className="contact-container col-md-7">
            <FiArrowRightCircle size={28} color="#b23137" /> <a href="https://sites.google.com/cin.ufpe.br/observatoriocovid-19/">Site do projeto Observatório Covid-19</a>
          </div>
          <div className="contact-container col-md-7">
            <FiMail size={28} color="#b23137" /> <a href="mailto:ocovid19@cin.ufpe.br">ocovid19@cin.ufpe.br</a>
          </div>
          <div className="contact-container col-md-7">
            <FiInstagram size={28} color="#b23137" /> <a href="https://www.instagram.com/observatorio.covid.19/">Instagram</a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
