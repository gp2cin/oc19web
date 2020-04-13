import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import './styles.css'

import api from '../../services/api';

export default function OfficialCases() {

    const [states, setStates] = useState([{value: 26, label: 'Pernambuco'}]);
    //setStates([{value: 26, label: 'Pernambuco'}]);
    const [cities, setCities] = useState([]);
    const [confirmedCases, setConfirmedCases] = useState(0);
    const [suspectCases, setSuspectCases] = useState(0);
    const [deaths, setDeaths] = useState(0);
    const [discardedCases, setDiscardedCases] = useState(0);

    const animatedComponents = makeAnimated();

    function handleStateChoice(choice) {
        if(choice !== null){
            fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${choice.value}/municipios`)
            .then(res => res.json())
            .then((data) => {
                console.log(cities)
                let arr = []
                for (const i in data) {
                    const itemToAdd = {value: `${data[i].id}`, label: `${data[i].nome}`};
                    arr = [...arr, itemToAdd]
                }
                setCities(arr);
            })
        } else {
            setCities([]);
        }
    }

    function handleCityChoice() {
        console.log('a')
    }

    return(
        <div className="official-cases-container">
            <h1>Busque os casos registrados oficialmente por cidade.</h1>
            <div className="search-container col-10">
                <div className="state-select col-12">
                    <p>Escolha um estado:</p>
                    <Select
                        className="select"
                        placeholder="Escolha"
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        defaultValue={[]}
                        isClearable
                        isSearchable
                        onChange={handleStateChoice}
                        options={states}
                    />
                </div>
                <div className="city-select  col-12">
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
            <div className="search-results-container col-10">
                <div className="result-cases col-7">
                    <p>Número de casos confirmados:</p>
                    <p1>{`${confirmedCases}`}</p1>
                </div>
                <div className="result-cases col-7">
                    <p>Número de óbitos:</p>
                    <p1>{`${deaths}`}</p1>
                </div>
                <div className="result-cases col-7">
                    <p>Número de casos suspeitos:</p>
                    <p1>{`${suspectCases}`}</p1>
                </div>
                <div className="result-cases col-7">
                    <p>Número de casos descartados:</p>
                    <p1>{`${discardedCases}`}</p1>
                </div>
            </div>
        </div>
    );
}