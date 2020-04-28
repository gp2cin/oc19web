import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import './styles.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import api from '../../services/api';
import moment from 'moment';

export default function OfficialCases() {
    const [state, setState] = useState({})
    const [cities, setCities] = useState([]);
    const [confirmedCases, setConfirmedCases] = useState('-');
    const [suspectCases, setSuspectCases] = useState('-');
    const [deaths, setDeaths] = useState('-');
    const [recoveredCases, setrecoveredCases] = useState('-');

    const animatedComponents = makeAnimated();

    //Pegar os dados de casos oficiais de Pernambuco
    useEffect(() => {
        try {
            api.get('api/v1/cases/state')
                .then(response => {
                    console.log(response)
                    setState(response.data)
                })
        } catch (error) {
            console.log(error)
        }
    }, [])

    //Pegar os municípios do estado de Pernambuco
    useEffect(() => {
        try {
            //base de dados do IBGE, código de Pernambuco: 26
            fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/26/municipios`)
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
        } catch (error) {
            console.log(error)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleCityChoice(choice) {
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
                    }
                })
        }
    }

    return (
        <div className="external-container">
            <Header />
            <div className="official-cases-container row">
                <h1>Acompanhe os casos oficiais de <strong>Pernambuco</strong> .</h1>
                <div className="state-cases-container col-md-10">
                    <div className="result-cases col-7">
                        <p>Número de casos confirmados:</p>
                        <p1>{state.confirmed ? state.confirmed : '-'}</p1>
                    </div>
                    <div className="result-cases col-md-7">
                        <p>Número de óbitos:</p>
                        <p1>{state.deaths ? state.deaths : '-'}</p1>
                    </div>
                    <div className="result-cases col-md-7">
                        <p>Número de casos suspeitos:</p>
                        <p1>{state.suspects ? state.suspects : '-'}</p1>
                    </div>
                    <div className="result-cases col-md-7">
                        <p>Número de casos recuperados:</p>
                        <p1>{state.recovered ? state.recovered : '-'}</p1>
                    </div>
                    <div className="result-cases col-md-7">
                        <p>Número de casos ativos:</p>
                        <p1>{state.active ? state.active : '-'}</p1>
                    </div>
                    <div className="result-cases col-md-7">
                        <p>Letalidade:</p>
                        <p1>{state.lethality_percentage ? state.lethality_percentage : '-'}</p1>
                    </div>
                </div>
                <h1>Busque os casos registrados oficialmente nos municipios de <strong>Pernambuco</strong> .</h1>
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
                <h6> {state.updatedAt ? `Fonte: IRRD-PE. Atualizado em: ${moment(state.updatedAt).format('DD/MM/YYYY')}` : 'Fonte: IRRD-PE.'}</h6>
            </div>
            <Footer />
        </div>
    );
}