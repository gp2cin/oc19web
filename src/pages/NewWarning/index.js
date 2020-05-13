import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useHistory } from 'react-router-dom';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import 'react-datepicker/dist/react-datepicker.css';
// import './styles.css';
import Header from '../../components/Header';
// import Footer from '../../components/Footer';
import { Container } from './styles';
import api from '../../services/api';

export default function WarningCreation() {
  const [sendDisabled, setSendDisabled] = useState(false);
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(null);
  const [birthdate, setBirthdate] = useState('');

  const animatedComponents = makeAnimated();
  const history = useHistory();

  const [symptomsControl, setSymptomsControl] = useState([]);

  //Symptoms object wich goes to the backend
  const symptoms = {
    headache: false,
    runny_nose: false,
    breathlessness: false,
    cough: false,
    dry_cough: false,
    sore_throat: false,
    muscle_weakness_or_pain: false,
    sputum_production: false,
    sutuffy_nose: false,
    red_eyes: false,
    dificulty_swallowing: false,
    chills: false,
    body_red_spots: false,
    diarrhea: false,
    nausea: false,
    vomiting: false,
    lack_of_appetite: false,
    fever: false,
  };

  //Symptoms options to construct the select options on frontend
  const symptomOptions = [
    { value: 'headache', label: 'Dor de cabeça' },
    { value: 'runny_nose', label: 'Coriza' },
    { value: 'breathlessness', label: 'Dificuldade para respirar' },
    { value: 'cough', label: 'Tosse' },
    { value: 'dry_cough', label: 'Tosse seca' },
    { value: 'sore_throat', label: 'Dor de garganta' },
    { value: 'muscle_weakness_or_pain', label: 'Fraqueza ou dor muscular' },
    { value: 'sputum_production', label: 'Produção de escarro' },
    { value: 'sutuffy_nose', label: 'Obstrução do nariz' },
    { value: 'red_eyes', label: 'Vermelhidão nos olhos' },
    { value: 'dificulty_swallowing', label: 'Dificuldade para engolir' },
    { value: 'chills', label: 'Calafrios' },
    { value: 'body_red_spots', label: 'Manchas vermelhas no corpo' },
    { value: 'diarrhea', label: 'Diarreia' },
    { value: 'nausea', label: 'Náusea' },
    { value: 'vomiting', label: 'Vômito' },
    { value: 'lack_of_appetite', label: 'Falta de apetite' },
    { value: 'fever', label: 'Febre' },
  ];

  // const symptoms = {
  //     headache: false,
  //     runny_nose: false,
  //     breathlessness: false,
  //     sutuffy_nose: false,
  //     cough: false,
  //     sore_throat: false,
  //     diarrhea: false,
  //     fever: false,
  //     body_temperature: 0,
  //     body_ache: false,
  //     sore_throat: false,
  //     bellyache: false,
  //     malaise: false,
  //     pain_level: 0,
  //     took_medicine: false,
  //     better: false
  // };

  // //Symptoms options to construct the select options on frontend
  // const symptomOptions = [
  //     { value: 'headache', label: 'Dor de cabeça' },
  //     { value: 'runny_nose', label: 'Coriza' },
  //     { value: 'breathlessness', label: 'Dificuldade para respirar' },
  //     { value: 'cough', label: 'Tosse' },
  //     { value: 'sutuffy_nose', label: 'Nariz entupido' },
  //     { value: 'sore_throat', label: 'Dor de garganta' },
  //     { value: 'body_ache', label: 'Dor no corpo' },
  //     { value: 'bellyache', label: 'Dor de barriga' },
  //     { value: 'body_red_spots', label: 'Manchas vermelhas no corpo' },
  //     { value: 'diarrhea', label: 'Diarreia' },
  //     { value: 'malaise', label: 'Mal estar' },
  //     { value: 'fever', label: 'Febre' },
  // ];

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
    obesity: false,
  };

  //Diseases options to construct the select options on frontend
  const deseaseOptions = [
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
    { value: 'obesity', label: 'Obesidade' },
  ];

  //Respostas a cada pergunta de sim ou não
  const [contact_suspect_or_confirmed_case, setContact_suspect_or_confirmed_case] = React.useState();
  const handleChangeQ1 = (event) => {
    if (event.target.value === 'true') {
      setContact_suspect_or_confirmed_case(true);
    } else if (event.target.value === 'false') {
      setContact_suspect_or_confirmed_case(false);
    }
  };
  const [household_contact_confirmed_case, setHousehold_contact_confirmed_case] = React.useState();
  const handleChangeQ2 = (event) => {
    if (event.target.value === 'true') {
      setHousehold_contact_confirmed_case(true);
    } else if (event.target.value === 'false') {
      setHousehold_contact_confirmed_case(false);
    }
  };
  const [been_in_health_unit, setBeen_in_health_unit] = React.useState();
  const handleChangeQ3 = (event) => {
    if (event.target.value === 'true') {
      setBeen_in_health_unit(true);
    } else if (event.target.value === 'false') {
      setBeen_in_health_unit(false);
    }
  };
  const [had_evaluation_for_symptoms, setHad_evaluation_for_symptoms] = React.useState();
  const handleChangeQ4 = (event) => {
    if (event.target.value === 'true') {
      setHad_evaluation_for_symptoms(true);
    } else if (event.target.value === 'false') {
      setHad_evaluation_for_symptoms(false);
    }
    if (event.target.value === 'true') {
      setIsRequiredQ5('*');
    } else {
      setIsRequiredQ5('');
    }
  };
  const [covid19_was_discarded, setCovid19_was_discarded] = React.useState();
  const handleChangeQ5 = (event) => {
    if (event.target.value === 'true') {
      setCovid19_was_discarded(true);
    } else if (event.target.value === 'false') {
      setCovid19_was_discarded(false);
    }
  };
  const [covid_tested, setCovid_tested] = React.useState();
  const handleChangeQ6 = (event) => {
    if (event.target.value === 'true') {
      setCovid_tested(true);
    } else if (event.target.value === 'false') {
      setCovid_tested(false);
    }
    if (event.target.value === 'true') {
      setIsRequiredQ7('*');
    } else {
      setIsRequiredQ7('');
    }
  };
  const [covid_result, setCovid_result] = React.useState();
  const handleChangeQ7 = (event) => {
    if (event.target.value === 'true') {
      setCovid_result(true);
    } else if (event.target.value === 'false') {
      setCovid_result(false);
    }
  };

  const [isRequiredQ5, setIsRequiredQ5] = useState('');
  const [isRequiredQ7, setIsRequiredQ7] = useState('');

  function handleBirthdate(d) {
    if (d === null) {
      const s = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
      setDate(d);
      setBirthdate(s);
    }
  }

  function handleSymptomsChange(symptomsChange) {
    if (symptomsChange !== null && symptomsChange.length !== 0) {
      setSymptomsControl(symptomsChange);
    } else {
      setSymptomsControl([]);
    }
  }

  function handleDeseasesChange(diseasesChange) {
    if (diseasesChange !== null && diseasesChange.length !== 0) {
      setDiseasesControl(diseasesChange);
    } else {
      setDiseasesControl([]);
    }
  }

  async function postWarning(data) {
    try {
      await api.post('api/v1/warnings', data).then((d) => {
        console.log(d);
      });
      //console.log(data);
      alert('Caso cadastrado com sucesso');
      setSendDisabled(false);
      history.push('/');
    } catch (error) {
      alert(`Erro ao cadastrar caso, tente novamente. ${error}`);
      setSendDisabled(false);
      console.log(data);
    }
  }

  async function handleNewWarning(e) {
    e.preventDefault();
    if (validateEmail(email) && isRequiredFilled()) {
      if (navigator.geolocation) {
        setSendDisabled(true);
        navigator.geolocation.getCurrentPosition((position) => {
          const address = {
            location: {
              type: 'Point',
              coordinates: [`${position.coords.latitude}`, `${position.coords.longitude}`],
            },
          };

          if (diseasesControl.length !== 0) {
            for (var key in diseases) {
              for (const i in diseasesControl) {
                if (key === diseasesControl[i].value) {
                  diseases[key] = true;
                }
              }
            }
          }

          if (symptomsControl.length !== 0) {
            for (var simpKey in symptoms) {
              for (const i in symptomsControl) {
                if (simpKey === symptomsControl[i].value) {
                  symptoms[simpKey] = true;
                }
              }
            }
          }

          const data = {
            email,
            address,
            birthdate,
            diseases,
            symptoms,
            contact_suspect_or_confirmed_case,
            household_contact_confirmed_case,
            been_in_health_unit,
            had_evaluation_for_symptoms,
            covid19_was_discarded,
            covid_tested,
            covid_result,
          };
          console.log(data);
          postWarning(data);
        }, handleLocationError);
      } else {
        alert('Geolocation is not supported by this browser.');
        setSendDisabled(false);
      }
    }
  }

  function handleLocationError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        setSendDisabled(false);
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        setSendDisabled(false);
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        setSendDisabled(false);
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        setSendDisabled(false);
        break;
      default:
        alert("An unknown error occurred.");
        setSendDisabled(false);
    }
  }

  function validateEmail(mail) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    alert('Você preencheu um endereço de e-mail invávido!');
    return false;
  }

  function isRequiredFilled() {
    if (
      email !== '' &&
      birthdate !== '' &&
      contact_suspect_or_confirmed_case !== {} &&
      household_contact_confirmed_case !== {} &&
      been_in_health_unit !== {} &&
      had_evaluation_for_symptoms !== {} &&
      covid_tested !== {}
    ) {
      if (had_evaluation_for_symptoms === true && covid19_was_discarded === {}) {
        alert('Você precisa preencher todos os campos obrigatórios!');
        return false;
      }
      if (covid_tested === true && covid_result === {}) {
        alert('Você precisa preencher todos os campos obrigatórios!');
        return false;
      }
      return true;
    }
    alert('Você precisa preencher todos os campos obrigatórios!');
    return false;
  }

  return (
    <div style={{ overflow: 'auto' }}>
      <Header />
      <Container>
        <div className={'new-warning-container'}>
          <section>
            <h1 className={'text-center'}>{'Informe o que você está sentindo'}</h1>
            <p className={'text-center'}>
              {'Ao registrar informações aqui, você se responsabiliza legalmente pela veracidade delas.'}
            </p>
          </section>
          <div className={'content col-md-12 row'}>
            <form>
              <div className={'personal-info col-md-12'}>
                <div className={'email col-md-9'}>
                  <p>{'E-mail'}</p>
                  <input
                    placeholder={'E-mail'}
                    className={'col-md-12 form-control'}
                    value={email}
                    type={'e-mail'}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div className={'birthdate-container col-md-3'}>
                  <p>{'Data de nascimento'}</p>
                  <DatePicker
                    maxDate={new Date()}
                    className={'date-picker form-control'}
                    dateFormat={'dd/MM/yyyy'}
                    locale={'BR'}
                    selected={date}
                    onChange={(date) => handleBirthdate(date)}
                  />
                </div>
              </div>
              <div className={'select-container col-md-6'}>
                <div className={'symptoms-container '}>
                  <p>{'Quais dos sintomas abaixo você está apresentando?'}</p>
                  <Select
                    className={'select col-md-12 '}
                    placeholder={'Escolha'}
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
              </div>
              <div className={'deseases-container col-md-6'}>
                <p>{'Você é portador de alguma dessas morbidades?'}</p>
                <Select
                  className={'select col-md-12'}
                  placeholder={'Escolha'}
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

              <div className={'questions-container col-md-12'}>
                <div className={'questions-div'}>
                  <FormControl component={'fieldset'}>
                    <p>{'Você manteve contato com caso suspeito ou confirmado para COVID-19 nos últimos 14 dias?*'}</p>
                    <RadioGroup
                      aria-label={'q'}
                      name={'q1'}
                      value={contact_suspect_or_confirmed_case}
                      onChange={handleChangeQ1}
                    >
                      <FormControlLabel value={'true'} control={<Radio />} label={'Sim'} />
                      <FormControlLabel value={'false'} control={<Radio />} label={'Não'} />
                    </RadioGroup>
                  </FormControl>
                  <FormControl component={'fieldset'} className={'col-md-9'}>
                    <p>Você manteve contato domiciliar com caso confirmado por COVID-19 nos últimos 14 dias?*</p>
                    <RadioGroup
                      aria-label={'q'}
                      name={'q2'}
                      value={household_contact_confirmed_case}
                      onChange={handleChangeQ2}
                    >
                      <FormControlLabel value={'true'} control={<Radio />} label={'Sim'} />
                      <FormControlLabel value={'false'} control={<Radio />} label={'Não'} />
                    </RadioGroup>
                  </FormControl>
                  <FormControl component={'fieldset'} className={'col-md-9'}>
                    <p>{'Você esteve em alguma unidade de saúde nos 14 dias antes do início dos sintomas?*'}</p>
                    <RadioGroup aria-label={'q'} name={'q3'} value={been_in_health_unit} onChange={handleChangeQ3}>
                      <FormControlLabel value={'true'} control={<Radio />} label={'Sim'} />
                      <FormControlLabel value={'false'} control={<Radio />} label={'Não'} />
                    </RadioGroup>
                  </FormControl>
                  <FormControl component={'fieldset'} className={'col-md-9'}>
                    <p>
                      {
                        'Você passou por alguma avaliação médica para tratar dos sintomas que você está apresentando no momento?*'
                      }
                    </p>
                    <RadioGroup
                      aria-label={'q'}
                      name={'q4'}
                      value={had_evaluation_for_symptoms}
                      onChange={handleChangeQ4}
                    >
                      <FormControlLabel value={'true'} control={<Radio />} label={'Sim'} />
                      <FormControlLabel value={'false'} control={<Radio />} label={'Não'} />
                    </RadioGroup>
                  </FormControl>
                  <FormControl component={'fieldset'} className={'col-md-9'}>
                    <p>
                      {`Caso afirmativo para a questão anterior, a contaminação por COVID-19 foi descartada?${isRequiredQ5}`}
                    </p>
                    <RadioGroup aria-label={'q'} name={'q5'} value={covid19_was_discarded} onChange={handleChangeQ5}>
                      <FormControlLabel value={'true'} control={<Radio />} label={'Sim'} />
                      <FormControlLabel value={'false'} control={<Radio />} label={'Não'} />
                    </RadioGroup>
                  </FormControl>
                  <FormControl component={'fieldset'} className={'col-md-9'}>
                    <p>{'Você fez algum exame para detectar o coronavírus?*'}</p>
                    <RadioGroup aria-label={'q'} name={'q6'} value={covid_tested} onChange={handleChangeQ6}>
                      <FormControlLabel value={'true'} control={<Radio />} label={'Sim'} />
                      <FormControlLabel value={'false'} control={<Radio />} label={'Não'} />
                    </RadioGroup>
                  </FormControl>
                  <FormControl component={'fieldset'} className={'col-md-9'}>
                    <p>{`Caso afirmativo para a questão anterior, qual o resultado do exame?${isRequiredQ7}`}</p>
                    <RadioGroup aria-label={'q'} name={'q7'} value={covid_result} onChange={handleChangeQ7}>
                      <FormControlLabel value={'true'} control={<Radio />} label={'Positivo'} />
                      <FormControlLabel value={'false'} control={<Radio />} label={'Negativo'} />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            </form>
            <section className={'col-md-12'}>
              <p>{'Nós precisaremos coletar sua localização. Por favor, autorize quando requisitado.'}</p>
              <button disabled={sendDisabled} onClick={handleNewWarning} className={'btn btn-primary col-md-12'} type={'submit'}>
                {'Enviar'}
              </button>
            </section>
          </div>
        </div>
        {/* <Footer /> */}
      </Container>
    </div>
  );
}
