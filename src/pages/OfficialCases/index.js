import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import './styles.css'
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import api from '../../services/api';

export default function OfficialCases() {

    //const [state, setState] = useState([{ value: 26, label: 'Pernambuco' }]);
    //setStates([{value: 26, label: 'Pernambuco'}]);
    const [cities, setCities] = useState([]);
    const [confirmedCases, setConfirmedCases] = useState(1000);
    const [suspectCases, setSuspectCases] = useState(1000);
    const [deaths, setDeaths] = useState(1000);
    const [recoveredCases, setrecoveredCases] = useState(1000);
    const [activeCases, setactiveCases] = useState(1000);

    const animatedComponents = makeAnimated();

    /*function handleState(choice) {
        if (choice !== null) {
            fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${choice.value}/municipios`)
                .then(res => res.json())
                .then((data) => {
                    console.log(cities)
                    let arr = []
                    for (const i in data) {
                        const itemToAdd = { value: `${data[i].id}`, label: `${data[i].nome}` };
                        arr = [...arr, itemToAdd]
                    }
                    setCities(arr);
                })
        } else {
            setCities([]);
        }
    }
    */

    function handleCityChoice(choice) {
        console.log('a')
        if (choice !== null) {
            console.log(choice.label.toLowerCase())
            const parsedCity = choice.label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            console.log(parsedCity);
            api.get(`api/v1/cases/state?cidade=${parsedCity}`)
                .then(response => {
                    console.log(response)
                    if (response !== null) {
                        console.log(response.data)
                        if (response.data.confirmed) {
                            setConfirmedCases(response.data.confirmed);
                        } else {
                            setConfirmedCases(0);
                        }
                        if (response.data.suspects) {
                            setSuspectCases(response.data.suspects);
                        } else {
                            setSuspectCases(0);
                        }
                        if (response.data.deaths) {
                            setDeaths(response.data.deaths);
                        } else {
                            setDeaths(0);
                        }
                        if (response.data.recovered) {
                            setrecoveredCases(response.data.recovered);
                        } else {
                            setrecoveredCases(0);
                        }
                        if (response.data.active) {
                            setrecoveredCases(response.data.recovered);
                        } else {
                            setactiveCases(0);
                        }
                    }
                })
        }
    }

    return (
        <div className="external-container">
            <Header />
            <div className="state-cases-container row">
                <h1>Acompanhe os casos oficiais de <strong>Pernambuco</strong></h1>
                <div className="state-results-container col-md-10">
                    <div className="result-cases col-7">
                        <p>Número de casos confirmados:</p>
                        <p1>{`${confirmedCases.toLocaleString()}`}</p1>
                    </div>
                    <div className="result-cases col-md-7">
                        <p>Número de óbitos:</p>
                        <p1>{`${deaths.toLocaleString()}`}</p1>
                    </div>
                    <div className="result-cases col-md-7">
                        <p>Número de casos suspeitos:</p>
                        <p1>{`${suspectCases.toLocaleString()}`}</p1>
                    </div>
                    <div className="result-cases col-md-7">
                        <p>Número de casos recuperados:</p>
                        <p1>{`${recoveredCases.toLocaleString()}`}</p1>
                    </div>
                    <div className="result-cases col-md-7">
                        <p>Número de casos ativos:</p>
                        <p1>{`${activeCases.toLocaleString()}`}</p1>
                    </div>
                    <div className="result-cases col-md-7">
                        <p>Letalidade:</p>
                        <p1>{`${activeCases.toLocaleString()}%`}</p1>
                    </div>
                </div>
            </div>
            <div className="cities-cases-container row">
                <h1>Busque os casos registrados oficialmente nos municipios de <strong>Pernambuco</strong></h1>
                <div className="search-container col-md-10">
                    <div className="city-select  col-md-6">
                        <p>Escolha uma cidade:</p>
                        <Select
                            className="select"
                            placeholder="Escolha"
                            closeMenuOnSelect={true}
                            components={animatedComponents}
                            defaultValue={[]}
                            isClearable
                            isSearchable
                            onChange={handleCityChoice}
                            options={cities}
                        />
                    </div>
                </div>
                <div className="search-results-container col-md-10">
                    <div className="result-cases col-7">
                        <p>Número de casos confirmados:</p>
                        <p1>{`${confirmedCases.toLocaleString()}`}</p1>
                    </div>
                    <div className="result-cases col-md-7">
                        <p>Número de óbitos:</p>
                        <p1>{`${deaths.toLocaleString()}`}</p1>
                    </div>
                    <div className="result-cases col-md-7">
                        <p>Número de casos suspeitos:</p>
                        <p1>{`${suspectCases.toLocaleString()}`}</p1>
                    </div>
                    <div className="result-cases col-md-7">
                        <p>Número de casos recuperados:</p>
                        <p1>{`${recoveredCases.toLocaleString()}`}</p1>
                    </div>
                </div>
            </div>
            <h6> {`Fonte: IRRD-PE. Atualizado em: `} </h6>
            <Footer />
        </div>
    );
}