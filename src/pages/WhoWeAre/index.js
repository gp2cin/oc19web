import React from 'react';

import './styles.css'
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function WhoWeAre() {
    return (
        <div className="external-container">
            <Header />
            <div className="info-container row">
                <h1> Sobre </h1>
                <div className="about-container col-md-10">
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
            </div>
            <Footer />
        </div >
    );

}