import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import DatePicker from 'react-datepicker';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';


import Header from '../../components/Header';
// import Footer from '../../components/Footer';
import { Container } from './styles';
import './styles.css'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default function ObserverReport() {

    const [sendDisabled, setSendDisabled] = useState(false);
    const history = useHistory();

    //Observer Data
    const [city, setSelectedCity] = useState('');
    const [neighborhood, setSelectedNeighborhood] = useState('');
    const [neighborhood_name, setNeighborhood_name] = useState('');

    //List of Recife's neighborhoods from backend
    const [neighborhooods, setNeighborhoods] = useState([]);

    //List of cities from IBGE API
    const [cities, setCities] = useState([]);

    const [isRecifeSelected, setIsRecifeSelected] = useState(false);

    //Case data
    const [report_type, setReportType] = useState('');
    const [case_type, setCaseType] = useState('');
    const [date, setDate] = useState(new Date());
    const [death_date, setDeathDate] = useState('');
    const [case_name, setCaseName] = useState('');
    const [case_age, setCaseAge] = useState();
    const [case_gender, setCaseGender] = useState('');
    const [caseHadPreExistingDiseases, setCaseHadPreExistingDiseases] = React.useState();
    const [household_contact_confirmed_case, setCaseHouseholdContact] = React.useState();
    const handleChangeQ5 = (event) => {
        if (event.target.value === 'true') {
            setCaseHouseholdContact(true);
        } else if (event.target.value === 'false') {
            setCaseHouseholdContact(false);
        } else if (event.target.value === 'not-known') {
            setCaseHouseholdContact('');
        }
    };
    const [info_source, setInfoSource] = useState('');
    const [info_source_link, setInfoSourceLink] = useState('');
    const [general_comments, setGeneralComments] = useState('');
    const [number_of_cases, setNumberOfCases] = useState(0);

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
    const diseases = {
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
            }).catch(error => {
                alert(`Erro ao carregar cidades da API do IBGE. Verifique sua conexão e recarregue a página. ${error}`);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleCityChoice(choice) {
        if (choice !== null) {
            setSelectedCity(choice.label);

            //Get Recife's neighborhoods form backend
            if (choice.label === 'Recife') {
                console.log('Recife!!')
                api.get('api/v1/neighborhoods?cidade=recife')
                    .then(response => {
                        if (response !== null) {
                            console.log('Resposta Recife!!')
                            console.log(response);
                            if (response.data !== null) {
                                console.log('Resposta Data!!')
                                console.log(response.data);
                                if (response.data !== null) {
                                    console.log('Resposta Bairros!!')
                                    console.log(response.data);
                                    let arr = [];
                                    for (const i in response.data) {
                                        const itemToAdd = { value: `${response.data[i]._id}`, label: `${response.data[i].name}` };
                                        arr = [...arr, itemToAdd];
                                    }
                                    setNeighborhoods(arr);
                                    setIsRecifeSelected(true);
                                }
                            }
                        }
                    }).catch(error => {
                        alert(`Erro ao buscar os bairros de Recife. Favor verifique sua conexão. ${error}`);
                    });
            } else {
                setNeighborhoods([]);
                setIsRecifeSelected(false);
            }
        }
    }

    function handleNeighborhoodChoice(choice) {
        if (choice !== null) {
            setSelectedNeighborhood(choice.value);
            setNeighborhood_name(choice.label);
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
        if (diseasesChange !== null && diseasesChange.length !== 0) {
            setDiseasesControl(diseasesChange);
        } else {
            setDiseasesControl([]);
        }
    }

    function isRequiredFilled() {
        if (
            neighborhood_name !== '' &&
            city !== '' &&
            report_type !== ''
        ) {
            if (report_type === 'individual' &&
                (case_type === '' ||
                    case_gender === '' ||
                    caseHadPreExistingDiseases === {} ||
                    household_contact_confirmed_case === {} ||
                    info_source === '')
            ) {
                console.log(case_type);
                console.log(caseHadPreExistingDiseases);
                console.log(household_contact_confirmed_case);
                console.log(info_source);
                alert('Você precisa preencher todos os campos obrigatórios!');
                return false;
            }
            if (case_type === 'death' && report_type === 'individual' && death_date === '') {
                alert('Você precisa preencher todos os campos obrigatórios! Preencha a data de morte.');
                return false;
            }
            if (report_type === 'social' &&
                (case_type === '' ||
                    number_of_cases === 0 ||
                    info_source === '')
            ) {
                alert('Você precisa preencher todos os campos obrigatórios!');
                return false;
            }
            return true;
        }
        alert('Você precisa preencher todos os campos obrigatórios!');
        return false;
    }

    function handleNewObserverReport(e) {
        e.preventDefault();
        if (isRequiredFilled()) {
            setSendDisabled(true);
            if (diseasesControl.length !== 0) {
                for (var key in diseases) {
                    for (const i in diseasesControl) {
                        if (key === diseasesControl[i].value) {
                            diseases[key] = true;
                        }
                    }
                }
            }
            const data = {
                city,
                neighborhood,
                neighborhood_name,
                report_type,
                case_type,
                death_date,
                case_name,
                case_age,
                case_gender,
                diseases,
                household_contact_confirmed_case,
                info_source,
                info_source_link,
                general_comments,
                number_of_cases,
            }
            postObserverReport(data);
        }
    }

    async function postObserverReport(data) {
        try {
            await api.post('api/v1/observer-report', data).then((d) => {
                console.log(d);
            });
            //console.log(data);
            alert('Cadastrado com sucesso');
            setSendDisabled(false);
            history.push('/');
        } catch (error) {
            alert(`Erro ao cadastrar, tente novamente. ${error}`);
            setSendDisabled(false);
            console.log(data);
        }
    }

    return (
        <div style={{ overflow: 'auto' }}>
            <Header />
            <Container>
                <div className="observer-report-container">
                    <section>
                        <h1 className={'text-center'}>{'Protocolo de Observações do OCOVID19'}</h1>
                        <p className={'text-center'}>
                            {'Ao registrar informações aqui, você se responsabiliza legalmente pela veracidade delas.'}
                        </p>
                    </section>
                    <div className="content row d-flex p-2">
                        <form className="col-md-12">
                            <div className="initial-info col-md-12">
                                {/* <div className="first-inputs col-md-12">
                                    <div className="name col-md-6" style={{ padding: 0, paddingRight: '10px' }}>
                                        <p>Nome do observador oficial:*</p>
                                        <input
                                            placeholder="Nome"
                                            className="col-md-12 form-control"
                                        ></input>
                                    </div>
                                    <div className="email col-md-6" style={{ padding: 0, paddingLeft: '10px' }}>
                                        <p>E-mail do observador oficial:*</p>
                                        <input
                                            placeholder="E-mail"
                                            className="col-md-12 form-control"
                                            type="e-mail"
                                        ></input>
                                    </div>
                                </div> */}
                                <div className="seccond-inputs col-md-12">
                                    <div className="city-select col-md-6" style={{ padding: 0, paddingRight: '10px' }}>
                                        <p>Cidade:*</p>
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
                                    <div className="neighborhood col-md-6" style={{ padding: 0, paddingRight: '10px' }}>
                                        <p>Bairro:*</p>
                                        {
                                            !isRecifeSelected &&
                                            <input
                                                placeholder="Bairro"
                                                className="col-md-12 form-control"
                                                value={neighborhood_name}
                                                onChange={(e) => {
                                                    setSelectedNeighborhood('');
                                                    setNeighborhood_name(e.target.value);
                                                }}
                                            ></input>

                                        }
                                        {
                                            isRecifeSelected &&
                                            <Select
                                                className="select"
                                                placeholder="Escolha"
                                                closeMenuOnSelect={true}
                                                components={animatedComponents}
                                                defaultValue={[]}
                                                isClearable
                                                isSearchable
                                                onChange={handleNeighborhoodChoice}
                                                options={neighborhooods}
                                            />
                                        }
                                    </div>
                                </div>
                                <div className="report-type col-md-9">
                                    <FormControl component={'fieldset'} className="col-md-9">
                                        <p>{'Qual tipo de informe você quer fazer?*'}</p>
                                        <RadioGroup
                                            aria-label={'q'}
                                            name={'q1'}
                                            value={report_type}
                                            onChange={(e) => setReportType(e.target.value)}
                                        >
                                            <FormControlLabel value={'individual'} control={<Radio />} label={'Individual'} />
                                            <FormControlLabel value={'social'} control={<Radio />} label={'Social'} />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                            {
                                report_type === 'individual' &&
                                <div className="individual-info col-md-12">
                                    <div className="case-type col-md-9">
                                        <FormControl component={'fieldset'} className="col-md-9">
                                            <p>{'Tipo de caso:*'}</p>
                                            <RadioGroup
                                                aria-label={'q'}
                                                name={'q2'}
                                                value={case_type}
                                                onChange={(e) => setCaseType(e.target.value)}
                                            >
                                                <FormControlLabel value={'suspect'} control={<Radio />} label={'Caso Suspeito'} />
                                                <FormControlLabel value={'confirmed'} control={<Radio />} label={'Caso Confirmado'} />
                                                <FormControlLabel value={'death'} control={<Radio />} label={'Óbito'} />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                    {
                                        case_type === 'death' &&
                                        <div className="death-date col-md-9">
                                            <p>{'Em caso de óbito, informe a data do óbito:*'}</p>
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
                                    <div className="third-inputs col-md-12">
                                        <div className="name col-md-6" style={{ padding: 0, paddingRight: '10px' }}>
                                            <p>Nome:</p>
                                            <input
                                                placeholder="Nome"
                                                className="col-md-12 form-control"
                                                value={case_name}
                                                onChange={(e) => setCaseName(e.target.value)}
                                            ></input>
                                        </div>
                                        <div className="age col-md-6" style={{ padding: 0, paddingRight: '10px' }}>
                                            <p>Idade:</p>
                                            <input
                                                placeholder="Ex: 60"
                                                className="col-md-12 form-control"
                                                type="number"
                                                min="0"
                                                step="1"
                                                value={case_age}
                                                onChange={(e) => setCaseAge(e.target.value)}
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="gender col-md-9">
                                        <FormControl component={'fieldset'} className="col-md-9">
                                            <p>{'Sexo:*'}</p>
                                            <RadioGroup
                                                aria-label={'q'}
                                                name={'q3'}
                                                value={case_gender}
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
                                            <p>{'O paciente tinha alguma doença preexistente?*'}</p>
                                            <RadioGroup
                                                aria-label={'q'}
                                                name={'q4'}
                                                value={caseHadPreExistingDiseases}
                                                onChange={(e) => setCaseHadPreExistingDiseases(e.target.value)}
                                            >
                                                <FormControlLabel value={'yes'} control={<Radio />} label={'Sim'} />
                                                <FormControlLabel value={'no'} control={<Radio />} label={'Não'} />
                                                <FormControlLabel value={'not-known'} control={<Radio />} label={'Não sei informar'} />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                    {
                                        caseHadPreExistingDiseases === 'yes' &&
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
                                    }
                                    <div className="had-household-contact col-md-9">
                                        <FormControl component={'fieldset'} className="col-md-9">
                                            <p>{'O paciente manteve contato domiciliar com caso confirmado por COVID-19 nos últimos 14 dias?*'}</p>
                                            <RadioGroup
                                                aria-label={'q'}
                                                name={'q5'}
                                                value={household_contact_confirmed_case}
                                                onChange={handleChangeQ5}
                                            >
                                                <FormControlLabel value={'true'} control={<Radio />} label={'Sim'} />
                                                <FormControlLabel value={'false'} control={<Radio />} label={'Não'} />
                                                <FormControlLabel value={'not-known'} control={<Radio />} label={'Não sei informar'} />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                    <div className="fourth-inputs col-md-12">
                                        <div className="info-source col-md-6" style={{ padding: 0, paddingRight: '10px' }}>
                                            <p>Fonte da informação:*</p>
                                            <input
                                                placeholder="Fonte da informação"
                                                className="col-md-12 form-control"
                                                value={info_source}
                                                onChange={(e) => setInfoSource(e.target.value)}
                                            ></input>
                                        </div>
                                        <div className="info-source-link col-md-6" style={{ padding: 0, paddingLeft: '10px' }}>
                                            <p>Link da fonte da informação (Fotos, Vídeos e etc):</p>
                                            <input
                                                placeholder="Ex: https://google.com"
                                                className="col-md-12 form-control"
                                                value={info_source_link}
                                                onChange={(e) => setInfoSourceLink(e.target.value)}
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="comments col-md-12" style={{ padding: 0 }}>
                                            <p>Comentários gerais:</p>
                                            <input
                                                placeholder="Comentários gerais"
                                                className="col-md-12 form-control"
                                                value={general_comments}
                                                onChange={(e) => setGeneralComments(e.target.value)}
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                report_type === 'social' &&
                                <div className="social-info col-md-12">
                                    <div className="case-type col-md-9">
                                        <FormControl component={'fieldset'} className="col-md-9">
                                            <p>{'Tipo de caso:*'}</p>
                                            <RadioGroup
                                                aria-label={'q'}
                                                name={'q2'}
                                                value={case_type}
                                                onChange={(e) => setCaseType(e.target.value)}
                                            >
                                                <FormControlLabel value={'suspect'} control={<Radio />} label={'Caso Suspeito'} />
                                                <FormControlLabel value={'confirmed'} control={<Radio />} label={'Caso Confirmado'} />
                                                <FormControlLabel value={'death'} control={<Radio />} label={'Óbito'} />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="number-of-cases col-md-6" style={{ padding: 0, paddingRight: '10px' }}>
                                            <p>Quantidade de casos:*</p>
                                            <input
                                                placeholder="Ex: 10"
                                                className="col-md-12 form-control"
                                                type="number"
                                                min="0"
                                                step="1"
                                                value={number_of_cases}
                                                onChange={(e) => setNumberOfCases(e.target.value)}
                                            ></input>
                                        </div>
                                        <div className="info-source col-md-6" style={{ padding: 0, paddingLeft: '10px' }}>
                                            <p>Fonte da informação:*</p>
                                            <input
                                                placeholder="Fonte da informação"
                                                className="col-md-12 form-control"
                                                value={info_source}
                                                onChange={(e) => setInfoSource(e.target.value)}
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="info-source-link col-md-6" style={{ padding: 0, paddingRight: '10px' }}>
                                            <p>Link da fonte da informação (Fotos, Vídeos e etc):</p>
                                            <input
                                                placeholder="Ex: https://google.com"
                                                className="col-md-12 form-control"
                                                value={info_source_link}
                                                onChange={(e) => setInfoSourceLink(e.target.value)}
                                            ></input>
                                        </div>
                                        <div className="comments col-md-6" style={{ padding: 0, paddingLeft: '10px' }}>
                                            <p>Comentários gerais:</p>
                                            <input
                                                placeholder="Comentários gerais"
                                                className="col-md-12 form-control"
                                                value={general_comments}
                                                onChange={(e) => setGeneralComments(e.target.value)}
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                            }
                        </form>
                        <section className={'col-md-12'}>
                            <button disabled={sendDisabled} onClick={handleNewObserverReport} className={'btn btn-primary col-md-12'} type={'submit'}>
                                {'Enviar'}
                            </button>
                        </section>
                    </div>
                </div>
            </Container>
        </div >
    );
}