import React from 'react';

import './styles.css'
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function WhoWeAre() {
    return (
        <div className="external-container">
            <Header />
            <div className="info-container row">
                <div className="about-continer col-md-10">
                    <h1> Sobre </h1>
                    <p> Olá mundo!!! </p>
                </div>
            </div>
            <Footer />
        </div >
    );

}