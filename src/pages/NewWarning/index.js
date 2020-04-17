import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useHistory } from 'react-router-dom';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import "react-datepicker/dist/react-datepicker.css";
import './styles.css';

import api from '../../services/api';

export default function WarningCreation() {
    const [email, setEmail] = useState('');
    const [date, setDate] = useState(new Date());
    const [birthdate, setBirthdate] = useState('');
    const [symptoms, setSymptoms] = useState([]);
    const [deseases, setDeseases] = useState([]);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    const animatedComponents = makeAnimated();
    const history = useHistory();

    const symptomOptions = [
        { value: 'headache', label: 'Dor de cabeça' },
        { value: 'runny-nose', label: 'Coriza' },
        { value: 'breathlessness', label: 'Dificuldade para respirar' },
        { value: 'cough', label: 'Tosse' },
        { value: 'dry-cough', label: 'Tosse seca' },
        { value: 'sore-throat', label: 'Dor de garganta' },
        { value: 'muscle-weakness-or-pain', label: 'Fraqueza ou dor muscular' },
        { value: 'sputum-production', label: 'Produção de escarro' },
        { value: 'nose-obstruction', label: 'Obstrução do nariz' },
        { value: 'red-eyes', label: 'Vermelhidão nos olhos' },
        { value: 'dificulty-swallowing', label: 'Dificuldade para engolir' },
        { value: 'chills', label: 'Calafrios' },
        { value: 'body-red-spots', label: 'Manchas vermelhas no corpo' },
        { value: 'diarrhea', label: 'Diarreia' },
        { value: 'nausea', label: 'Náusea' },
        { value: 'vomiting', label: 'Vômito' },
        { value: 'lack-of-appetite', label: 'Falta de apetite' },
        { value: 'fever', label: 'Febre' },
    ];

    const deseaseOptions = [
        { value: 'diabetes', label: 'Diabetes' },
        { value: 'neurological-desease', label: 'Doença Neurológica' },
        { value: 'hiv-infection', label: 'Infecção pelo HIV' },
        { value: 'cancer', label: 'Neoplasia (Cancer)' },
        { value: 'kidney-disease', label: 'Doença renal (doença nos rins)' },
        { value: 'heart-disease', label: 'Doença cardiovascular (doença no coração), incluindo hipertensão' },
        { value: 'liver-disease', label: 'Doença Hepática (doença no fígado)' },
        { value: 'immunodeficiency ', label: 'Imunodeficiência (imunidade baixa)' },
        { value: 'lung-disease', label: 'Doença pulmonar crônica (doença nos pulmões)' },
        { value: 'neuromuscular-disease', label: 'Doença neuromuscular (doença muscular)' },
    ];

    //Respostas a cada pergunta de sim ou não
    const [valueQ1, setValueQ1] = React.useState('');
    const handleChangeQ1 = (event) => {
        setValueQ1(event.target.value);
    };
    const [valueQ2, setValueQ2] = React.useState('');
    const handleChangeQ2 = (event) => {
        setValueQ2(event.target.value);
    };
    const [valueQ3, setValueQ3] = React.useState('');
    const handleChangeQ3 = (event) => {
        setValueQ3(event.target.value);
    };
    const [valueQ4, setValueQ4] = React.useState('');
    const handleChangeQ4 = (event) => {
        setValueQ4(event.target.value);
        if (event.target.value == 'yes') {
            setIsRequiredQ5('*');
        } else {
            setIsRequiredQ5('');
        }
    };
    const [valueQ5, setValueQ5] = React.useState('');
    const handleChangeQ5 = (event) => {
        setValueQ5(event.target.value);
        console.log(valueQ4);
    };
    const [valueQ6, setValueQ6] = React.useState('');
    const handleChangeQ6 = (event) => {
        setValueQ6(event.target.value);
        if (event.target.value == 'yes') {
            setIsRequiredQ7('*');
        } else {
            setIsRequiredQ7('');
        }
    };
    const [valueQ7, setValueQ7] = React.useState('');
    const handleChangeQ7 = (event) => {
        setValueQ7(event.target.value);
    };

    const [isRequiredQ5, setIsRequiredQ5] = useState('');
    const [isRequiredQ7, setIsRequiredQ7] = useState('');

    function handleBirthdate(d) {
        if (d !== null) {
            const s = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
            setDate(d);
            setBirthdate(s);
        }
    }

    function handleSymptomsChange(symptomsChange) {
        if (symptomsChange == null) {
            setSymptoms([]);
            //setTargetHeight(36);
        } else {
            setSymptoms(symptomsChange);
            //setTargetHeight(symptomsChange.length * 36);
        }
    }

    function handleDeseasesChange(deseasesChange) {
        if (deseasesChange == null) {
            setDeseases([]);
        } else {
            setDeseases(deseasesChange);
        }
    }

    async function postWarning(data) {
        try {
            await api.post('api/v1/warnings', data)
                .then((d) => {
                    console.log(d)
                })
            //console.log(data);
            //history.push('/');
        } catch (error) {
            alert(`Erro ao cadastrar caso, tente novamente. ${error}`);
            console.log(data);
        }
    }

    async function handleNewWarning(e) {
        e.preventDefault();
        if (validateEmail(email) && isRequiredFilled()) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const address = {
                        "location": {
                            "type": "Point",
                            "coordinates": [`${position.coords.latitude}`, `${position.coords.longitude}`]
                        }
                    };

                    const data = {
                        email,
                        address,
                        birthdate,
                    };
                    postWarning(data);
                });
            }
            else {
                alert("Geolocation is not supported by this browser.");
            }
        }
    }

    function validateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true)
        }
        alert("Você preencheu um endereço de e-mail invávido!")
        return (false)
    }

    function isRequiredFilled() {
        if (email !== '' && birthdate !== '' && valueQ1 !== '' && valueQ2 !== '' && valueQ3 !== '' && valueQ4 !== '' && valueQ6 !== '') {
            if (valueQ4 == 'yes' && valueQ5 == '') {
                alert("Você precisa preencher todos os campos obrigatórios!")
                return false;
            }
            if (valueQ6 == 'yes' && valueQ7 == '') {
                alert("Você precisa preencher todos os campos obrigatórios!")
                return false;
            }
            return true;
        }
        alert("Você precisa preencher todos os campos obrigatórios!")
        return false;
    }

    return (
        <div className="new-warning-container">
            <section>
                <h1>Informe o que você está sentindo</h1>
                <p>Ao registrar informações aqui, você se responsabiliza legalmente pela veracidade delas.</p>
            </section>
            <div className="content col-12 row">
                <form>
                    <div className="personal-info col-12">
                        <div className="email col-11">
                            <p>Insira seu e-mail:*</p>
                            <input
                                placeholder="E-mail"
                                className="col-10"
                                value={email}
                                type="e-mail"
                                onChange={e => setEmail(e.target.value)}
                            >
                            </input>
                        </div>
                        <div className="birthdate-container col-11">
                            <p>Insira sua data de nascimento:*</p>
                            <DatePicker maxDate={new Date()} className="date-picker" dateFormat="dd/MM/yyyy" locale="BR" selected={date} onChange={date => handleBirthdate(date)} />
                        </div>

                    </div>
                    <div className="select-container col-12">
                        <div className="symptoms-container col-11">
                            <p>Quais dos sintomas abaixo você está apresentando?</p>
                            <Select
                                className="select col-11"
                                placeholder="Escolha"
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                defaultValue={[]}
                                isMulti
                                isClearable
                                isSearchable
                                onChange={handleSymptomsChange}
                                options={symptomOptions}
                            />
                        </div>
                        <div className="deseases-container col-11">
                            <p>Você é portador de alguma dessas morbidades?</p>
                            <Select
                                className="select col-11"
                                placeholder="Escolha"
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                defaultValue={[]}
                                isMulti
                                isClearable
                                isSearchable
                                onChange={handleDeseasesChange}
                                options={deseaseOptions}
                            />
                        </div>
                    </div>
                    <div className="questions-container col-12">
                        <div className="questions-div col-11">
                            <FormControl component="fieldset">
                                <p>Você manteve contato com caso suspeito ou confirmado para COVID-19 nos últimos 14 dias?*</p>
                                <RadioGroup aria-label="q" name="q1" value={valueQ1} onChange={handleChangeQ1}>
                                    <FormControlLabel value="yes" control={<Radio />} label="Sim" />
                                    <FormControlLabel value="no" control={<Radio />} label="Não" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl component="fieldset" className="col-9">
                                <p>Você manteve contato domiciliar com caso confirmado por COVID-19 nos últimos 14 dias?*</p>
                                <RadioGroup aria-label="q" name="q2" value={valueQ2} onChange={handleChangeQ2}>
                                    <FormControlLabel value="yes" control={<Radio />} label="Sim" />
                                    <FormControlLabel value="no" control={<Radio />} label="Não" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl component="fieldset" className="col-9">
                                <p>Você esteve em alguma unidade de saúde nos 14 dias antes do início dos sintomas?*</p>
                                <RadioGroup aria-label="q" name="q3" value={valueQ3} onChange={handleChangeQ3}>
                                    <FormControlLabel value="yes" control={<Radio />} label="Sim" />
                                    <FormControlLabel value="no" control={<Radio />} label="Não" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl component="fieldset" className="col-9">
                                <p>Você passou por alguma avaliação médica para tratar dos sintomas que você está apresentando no momento?*</p>
                                <RadioGroup aria-label="q" name="q4" value={valueQ4} onChange={handleChangeQ4}>
                                    <FormControlLabel value="yes" control={<Radio />} label="Sim" />
                                    <FormControlLabel value="no" control={<Radio />} label="Não" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl component="fieldset" className="col-9">
                                <p>Caso afirmativo para a questão anterior, a contaminação por COVID-19 foi descartada?{isRequiredQ5}</p>
                                <RadioGroup aria-label="q" name="q5" value={valueQ5} onChange={handleChangeQ5}>
                                    <FormControlLabel value="yes" control={<Radio />} label="Sim" />
                                    <FormControlLabel value="no" control={<Radio />} label="Não" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl component="fieldset" className="col-9">
                                <p>Você fez algum exame para detectar o coronavírus?*</p>
                                <RadioGroup aria-label="q" name="q6" value={valueQ6} onChange={handleChangeQ6}>
                                    <FormControlLabel value="yes" control={<Radio />} label="Sim" />
                                    <FormControlLabel value="no" control={<Radio />} label="Não" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl component="fieldset" className="col-9">
                                <p>Caso afirmativo para a questão anterior, qual o resultado do exame?{isRequiredQ7}</p>
                                <RadioGroup aria-label="q" name="q7" value={valueQ7} onChange={handleChangeQ7}>
                                    <FormControlLabel value="positive" control={<Radio />} label="Positivo" />
                                    <FormControlLabel value="negative" control={<Radio />} label="Negativo" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                </form>
                <section>
                    <p>Nós precisaremos coletar sua localização. Por favor, autorize quando requisitado.</p>
                    <button onClick={handleNewWarning} className="button" type="submit">Enviar</button>
                </section>
            </div>
        </div>
    );
}