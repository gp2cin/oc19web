import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import DatePicker from 'react-datepicker';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Container } from './styles';
import './styles.css'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default function ObserverReport() {

    //Observer Data
    const [observerName, setObserverName] = useState('');
    const [observerEmail, setObserverEmail] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [neighborhood, setNeighborhood] = useState('');

    //List of cities from IBGE API
    const [cities, setCities] = useState([]);

    //Case data
    const [reportType, setReportType] = useState();
    const [caseType, setCaseType] = useState('');
    const [date, setDate] = useState(new Date());
    const [deathDate, setDeathDate] = useState('');
    const [caseName, setCaseName] = useState('');
    const [caseAge, setCaseAge] = useState();
    const [caseGender, setCaseGender] = useState('');
    const [caseHadPreExistingDiseases, setCaseHadPreExistingDiseases] = useState('');
    const [caseHadHouseholdContact, setCaseHadHouseholdContact] = useState('');
    const [infoSource, setInfoSource] = useState('');
    const [infoSourceLink, setInfoSourceLink] = useState('');
    const [comments, setComments] = useState('');
    const [numberOfCases, setNumberOfCases] = useState('');

    const animatedComponents = makeAnimated();

    //List of diseases to construct the select on frontend
    const diseaseOptions = [
        { value: 'diabetes', label: 'Diabetes' },
        { value: 'neurological_disorders', label: 'Doença Neurológica' },
        { value: 'HIV_infection', label: 'Infecção pelo HIV' },
        { value: 'neoplasm', label: 'Neoplasia (Cancer)' },
        { value: 'kidney_disease', label: 'Doença renal (doença nos rins)' },
        { value: 'heart_disease', label: 'Doença cardiovascular (doença no coração), incluindo hipertensão' },
        { value: 'liver_disease', label: 'Doença Hepática (doença no fígado)' },
        { value: 'immunodeficiency', label: 'Imunodeficiência (imunidade baixa)' },
        { value: 'lung_disease', label: 'Doença pulmonar crônica (doença nos pulmões)' },
        { value: 'neuromuscular_disease', label: 'Doença neuromuscular (doença muscular)' },
    ];

    //Diseases selected
    const [diseasesControl, setDiseasesControl] = useState([]);

    //Diseases object wich goes to the backend
    const casePreExistingDiseases = {
        diabetes: false,
        neurological_disorders: false,
        HIV_infection: false,
        neoplasm: false,
        kidney_disease: false,
        heart_disease: false,
        liver_disease: false,
        immunodeficiency: false,
        lung_disease: false,
        neuromuscular_disease: false,
    };

    useEffect(() => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleCityChoice(choice) {
        if (choice != null) {
            setSelectedCity(choice.label);
        }
    }

    function handleDeathDate(d) {
        if (d !== null) {
            const s = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
            setDate(d);
            setDeathDate(s);
        }
    }

    function handleDeseasesChange(diseasesChange) {
        if (diseasesChange != null && diseasesChange.length != 0) {
            setDiseasesControl(diseasesChange);
        } else {
            setDiseasesControl([]);
        }
    }

    return (
        <div style={{ overflow: 'auto' }}>
            <Header />
            <Container>
                <div className="observer-report-container row">
                    <section>
                        <h1 className={'text-center'}>{'Protocolo de Observações do OCOVID19'}</h1>
                        <p className={'text-center'}>
                            {'Ao registrar informações aqui, você se responsabiliza legalmente pela veracidade delas.'}
                        </p>
                    </section>
                    <div className="content col-md-12 row">
                        <form>
                            <div className="initial-info col-md-12">
                                <div className="name col-md-9">
                                    <p>Nome do observador oficial:</p>
                                    <input
                                        placeholder="Nome"
                                        className="col-md-12 form-control"
                                        value={observerName}
                                        onChange={(e) => setObserverName(e.target.value)}
                                    ></input>
                                </div>
                                <div className="email col-md-9">
                                    <p>E-mail do observador oficial:</p>
                                    <input
                                        placeholder="E-mail"
                                        className="col-md-12 form-control"
                                        value={observerEmail}
                                        type="e-mail"
                                        onChange={(e) => setObserverEmail(e.target.value)}
                                    ></input>
                                </div>
                                <div className="city-select col-md-9">
                                    <p>Cidade:</p>
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
                                <div className="neighborhood col-md-9">
                                    <p>Bairro:</p>
                                    <input
                                        placeholder="Bairro"
                                        className="col-md-12 form-control"
                                        value={neighborhood}
                                        onChange={(e) => setNeighborhood(e.target.value)}
                                    ></input>
                                </div>
                                <div className="report-type col-md-9">
                                    <FormControl component={'fieldset'} className="col-md-9">
                                        <p>{'Qual tipo de informe você quer fazer?'}</p>
                                        <RadioGroup
                                            aria-label={'q'}
                                            name={'q1'}
                                            value={reportType}
                                            onChange={(e) => setReportType(e.target.value)}
                                        >
                                            <FormControlLabel value={'individual'} control={<Radio />} label={'Individual'} />
                                            <FormControlLabel value={'social'} control={<Radio />} label={'Social'} />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                            {
                                reportType == 'individual' &&
                                <div className="individual-info col-md-12">
                                    <div className="case-type col-md-9">
                                        <FormControl component={'fieldset'} className="col-md-9">
                                            <p>{'Qual tipo de informe você quer fazer?'}</p>
                                            <RadioGroup
                                                aria-label={'q'}
                                                name={'q2'}
                                                value={caseType}
                                                onChange={(e) => setCaseType(e.target.value)}
                                            >
                                                <FormControlLabel value={'suspect'} control={<Radio />} label={'Caso Suspeito'} />
                                                <FormControlLabel value={'confirmed'} control={<Radio />} label={'Caso Confirmado'} />
                                                <FormControlLabel value={'death'} control={<Radio />} label={'Óbito'} />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                    {
                                        caseType == 'death' &&
                                        <div className="death-date col-md-9">
                                            <p>{'Em caso de óbito, informe a data do óbito:'}</p>
                                            <DatePicker
                                                maxDate={new Date()}
                                                className={'date-picker form-control col-md-9'}
                                                dateFormat={'dd/MM/yyyy'}
                                                locale={'BR'}
                                                selected={date}
                                                onChange={(date) => handleDeathDate(date)}
                                            />
                                        </div>
                                    }
                                    <div className="name col-md-9">
                                        <p>Nome:</p>
                                        <input
                                            placeholder="Nome"
                                            className="col-md-12 form-control"
                                            value={caseName}
                                            onChange={(e) => setCaseName(e.target.value)}
                                        ></input>
                                    </div>
                                    <div className="age col-md-9">
                                        <p>Idade:</p>
                                        <input
                                            placeholder="Ex: 60"
                                            className="col-md-12 form-control"
                                            type="number"
                                            min="0"
                                            step="1"
                                            value={caseAge}
                                            onChange={(e) => setCaseAge(e.target.value)}
                                        ></input>
                                    </div>
                                    <div className="gender col-md-9">
                                        <FormControl component={'fieldset'} className="col-md-9">
                                            <p>{'Sexo:'}</p>
                                            <RadioGroup
                                                aria-label={'q'}
                                                name={'q3'}
                                                value={caseGender}
                                                onChange={(e) => setCaseGender(e.target.value)}
                                            >
                                                <FormControlLabel value={'male'} control={<Radio />} label={'Masculino'} />
                                                <FormControlLabel value={'female'} control={<Radio />} label={'Feminino'} />
                                                <FormControlLabel value={'not-known'} control={<Radio />} label={'Não sei informar'} />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                    <div className="had-pre-existing-diseases col-md-9">
                                        <FormControl component={'fieldset'} className="col-md-9">
                                            <p>{'O paciente tinha alguma doença preexistente?'}</p>
                                            <RadioGroup
                                                aria-label={'q'}
                                                name={'q3'}
                                                value={caseHadPreExistingDiseases}
                                                onChange={(e) => setCaseHadPreExistingDiseases(e.target.value)}
                                            >
                                                <FormControlLabel value={'yes'} control={<Radio />} label={'Sim'} />
                                                <FormControlLabel value={'no'} control={<Radio />} label={'Não'} />
                                                <FormControlLabel value={'not-known'} control={<Radio />} label={'Não sei informar'} />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                    <div className={'deseases-container col-md-9'}>
                                        <p>{'Quais doenças preexistentes?'}</p>
                                        <Select
                                            className={'select'}
                                            placeholder={'Escolha'}
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            defaultValue={[]}
                                            isMulti
                                            isClearable
                                            isSearchable
                                            onChange={handleDeseasesChange}
                                            options={diseaseOptions}
                                        />
                                    </div>
                                    <div className="had-household-contact col-md-9">
                                        <FormControl component={'fieldset'} className="col-md-9">
                                            <p>{'O paciente manteve contato domiciliar com caso confirmado por COVID-19 nos últimos 14 dias?'}</p>
                                            <RadioGroup
                                                aria-label={'q'}
                                                name={'q4'}
                                                value={caseHadHouseholdContact}
                                                onChange={(e) => setCaseHadHouseholdContact(e.target.value)}
                                            >
                                                <FormControlLabel value={'yes'} control={<Radio />} label={'Sim'} />
                                                <FormControlLabel value={'no'} control={<Radio />} label={'Não'} />
                                                <FormControlLabel value={'not-known'} control={<Radio />} label={'Não sei informar'} />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                    <div className="info-source col-md-9">
                                        <p>Fonte da informação:</p>
                                        <input
                                            placeholder="Fonte da informação"
                                            className="col-md-12 form-control"
                                            value={infoSource}
                                            onChange={(e) => setInfoSource(e.target.value)}
                                        ></input>
                                    </div>
                                    <div className="info-source-link col-md-9">
                                        <p>Link da fonte da informação (Fotos, Vídeos e etc):</p>
                                        <input
                                            placeholder="Ex: https://google.com"
                                            className="col-md-12 form-control"
                                            value={infoSourceLink}
                                            onChange={(e) => setInfoSourceLink(e.target.value)}
                                        ></input>
                                    </div>
                                    <div className="comments col-md-9">
                                        <p>Comentários gerais:</p>
                                        <input
                                            placeholder="Comentários gerais"
                                            className="col-md-12 form-control"
                                            value={comments}
                                            onChange={(e) => setComments(e.target.value)}
                                        ></input>
                                    </div>
                                </div>
                            }
                            {
                                reportType == 'social' &&
                                <div className="social-info col-md-12">
                                    <div className="case-type col-md-9">
                                        <FormControl component={'fieldset'} className="col-md-9">
                                            <p>{'Qual tipo de informe você quer fazer?'}</p>
                                            <RadioGroup
                                                aria-label={'q'}
                                                name={'q2'}
                                                value={caseType}
                                                onChange={(e) => setCaseType(e.target.value)}
                                            >
                                                <FormControlLabel value={'suspect'} control={<Radio />} label={'Caso Suspeito'} />
                                                <FormControlLabel value={'confirmed'} control={<Radio />} label={'Caso Confirmado'} />
                                                <FormControlLabel value={'death'} control={<Radio />} label={'Óbito'} />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                    <div className="number-of-cases col-md-9">
                                        <p>Quantidade de casos:</p>
                                        <input
                                            placeholder="Ex: 10"
                                            className="col-md-12 form-control"
                                            type="number"
                                            min="0"
                                            step="1"
                                            value={numberOfCases}
                                            onChange={(e) => setNumberOfCases(e.target.value)}
                                        ></input>
                                    </div>
                                    <div className="info-source col-md-9">
                                        <p>Fonte da informação:</p>
                                        <input
                                            placeholder="Fonte da informação"
                                            className="col-md-12 form-control"
                                            value={infoSource}
                                            onChange={(e) => setInfoSource(e.target.value)}
                                        ></input>
                                    </div>
                                    <div className="info-source-link col-md-9">
                                        <p>Link da fonte da informação (Fotos, Vídeos e etc):</p>
                                        <input
                                            placeholder="Ex: https://google.com"
                                            className="col-md-12 form-control"
                                            value={infoSourceLink}
                                            onChange={(e) => setInfoSourceLink(e.target.value)}
                                        ></input>
                                    </div>
                                    <div className="comments col-md-9">
                                        <p>Comentários gerais:</p>
                                        <input
                                            placeholder="Comentários gerais"
                                            className="col-md-12 form-control"
                                            value={comments}
                                            onChange={(e) => setComments(e.target.value)}
                                        ></input>
                                    </div>
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
}