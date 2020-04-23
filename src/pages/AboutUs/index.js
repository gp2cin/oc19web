import React from 'react';

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
            A plataforma Observatório Covid-19 tem como objetivo monitorar a propagação do vírus nos municípios de
            Pernambuco para que assim possamos divulgar dados oficias à população, como os casos suspeitos, confirmados,
            recuperados e óbtios. Além disso a plataforma permite que o cidadão relate casos suspeitos próximos a ele.
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
}
