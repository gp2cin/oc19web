import React, { useState } from 'react';
import MaskedInput from 'react-maskedinput';
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
import Header from '../../../components/Header';
// import Footer from '../../../components/Footer';
import { Container } from './styles';
import api from '../../../services/api';
import CustomSnackBar from '../../../components/CustomSnackBar';
import FileInput from '../../../components/FileInput';
import { uploadFile } from '../../../helpers/SendFileObservation';

export default function WarningCreation() {
  const [sendDisabled, setSendDisabled] = useState(false);
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(null);
  const [birthdate, setBirthdate] = useState('');

  const [images, setImages] = useState([]);
  const [uploadMessage, setUploadMessage] = useState('');

  // snackbar
  const [snack, setSnack] = useState({ type: 'success', message: '' });
  const [openSnack, setOpenSnack] = useState(false);

  const animatedComponents = makeAnimated();
  const history = useHistory();

  const [symptomsControl, setSymptomsControl] = useState([]);

  const [requiredInputStyle, setRequiredInputStyle] = useState({
    email: {},
    birthdate: {},
    contactSuspectOrConfirmedCase: {},
    householdContactConfirmedCase: {},
    beenInHealthUnit: {},
    hadEvaluationForSymptoms: {},
    covidTested: {},
    covid19WasDiscarded: {},
    covidResult: {},
  });

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
    if (d !== null) {
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
      const response = await api.post('api/v1/warnings', data);

      const error = await uploadFile({
        setUploadMessage,
        images,
        id: response.data.observerReport._id,
        type: 'newWarning',
      });

      if (!error) {
        setSnack({ type: 'success', message: 'Cadastrado com successo' });
        setOpenSnack(true);
        setSendDisabled(false);
        setTimeout(() => history.push('/'), 3000);
      } else {
        setSnack({
          type: 'success',
          message: 'Observação cadastrada, mas erro ao cadastrar os arquivos da observação.',
        });
        setOpenSnack(true);
        setSendDisabled(false);
        setTimeout(() => history.push('/'), 3000);
      }
    } catch (error) {
      setSnack({ type: 'error', message: 'Erro ao cadastrar caso, tente novamente.' });
      setOpenSnack(true);

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
          console.log(position);

          const address = {
            location: {
              type: 'Point',
              coordinates: [`${position.coords.latitude}`, `${position.coords.longitude}`],
            },
          };

          if (diseasesControl.length !== 0) {
            for (let key in diseases) {
              for (const i in diseasesControl) {
                if (key === diseasesControl[i].value) {
                  diseases[key] = true;
                }
              }
            }
          }

          if (symptomsControl.length !== 0) {
            for (let simpKey in symptoms) {
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
        setSendDisabled(false);
      }
    }
  }

  function handleLocationError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert('User denied the request for Geolocation.');
        setSendDisabled(false);
        break;
      case error.POSITION_UNAVAILABLE:
        alert('Location information is unavailable.');
        setSendDisabled(false);
        break;
      case error.TIMEOUT:
        alert('The request to get user location timed out.');
        setSendDisabled(false);
        break;
      case error.UNKNOWN_ERROR:
        alert('An unknown error occurred.');
        setSendDisabled(false);
        break;
      default:
        alert('An unknown error occurred.');
        setSendDisabled(false);
    }
  }

  function validateEmail(mail) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    setRequiredInputStyle((prev) => ({ ...prev, email: { borderColor: 'red' } }));
    setSnack({ type: 'error', message: 'Você preencheu um endereço de e-mail inválido!' });
    setOpenSnack(true);
    return false;
  }

  function isRequiredFilled() {
    if (
      email !== '' &&
      birthdate !== '' &&
      contact_suspect_or_confirmed_case !== {} &&
      contact_suspect_or_confirmed_case !== '' &&
      household_contact_confirmed_case !== {} &&
      household_contact_confirmed_case !== '' &&
      been_in_health_unit !== {} &&
      been_in_health_unit !== '' &&
      had_evaluation_for_symptoms !== {} &&
      had_evaluation_for_symptoms !== '' &&
      covid_tested !== {} &&
      covid_tested !== ''
    ) {
      if (
        had_evaluation_for_symptoms === true &&
        (covid19_was_discarded === {} || covid19_was_discarded === null || covid19_was_discarded === undefined)
      ) {
        if (covid_tested === true && (covid_result === {} || covid_result === null || covid_result === undefined)) {
          setRequiredInputStyle((prev) => ({
            ...prev,
            covid19WasDiscarded: { borderWidth: 1, borderStyle: 'solid', borderColor: 'red' },
          }));
          setRequiredInputStyle((prev) => ({
            ...prev,
            covidResult: { borderWidth: '1px', borderStyle: 'solid', borderColor: 'red' },
          }));
          setSnack({ type: 'error', message: 'Você precisa preencher todos os campos obrigatórios!' });
          setOpenSnack(true);
          return false;
        }
        setRequiredInputStyle((prev) => ({
          ...prev,
          covid19WasDiscarded: { borderWidth: 1, borderStyle: 'solid', borderColor: 'red' },
        }));
        setSnack({ type: 'error', message: 'Você precisa preencher todos os campos obrigatórios!' });
        setOpenSnack(true);
        return false;
      }
      if (covid_tested === true && (covid_result === {} || covid_result === null || covid_result === undefined)) {
        if (
          had_evaluation_for_symptoms === true &&
          (covid19_was_discarded === {} || covid19_was_discarded === null || covid19_was_discarded === undefined)
        ) {
          setRequiredInputStyle((prev) => ({
            ...prev,
            covidResult: { borderWidth: '1px', borderStyle: 'solid', borderColor: 'red' },
          }));
          setRequiredInputStyle((prev) => ({
            ...prev,
            covid19WasDiscarded: { borderWidth: 1, borderStyle: 'solid', borderColor: 'red' },
          }));
          setSnack({ type: 'error', message: 'Você precisa preencher todos os campos obrigatórios!' });
          setOpenSnack(true);
          return false;
        }
        setRequiredInputStyle((prev) => ({
          ...prev,
          covidResult: { borderWidth: '1px', borderStyle: 'solid', borderColor: 'red' },
        }));
        setSnack({ type: 'error', message: 'Você precisa preencher todos os campos obrigatórios!' });
        setOpenSnack(true);
        return false;
      }
      return true;
    }
    if (email === '') {
      setRequiredInputStyle((prev) => ({ ...prev, email: { borderColor: 'red' } }));
    }
    if (birthdate === '') {
      console.log('AQUI TESTE');
      setRequiredInputStyle((prev) => ({
        ...prev,
        birthdate: { borderWidth: '1px', borderStyle: 'solid', borderColor: 'red' },
      }));
    }
    if (contact_suspect_or_confirmed_case === null || contact_suspect_or_confirmed_case === undefined) {
      setRequiredInputStyle((prev) => ({
        ...prev,
        contactSuspectOrConfirmedCase: { borderWidth: '1px', borderStyle: 'solid', borderColor: 'red' },
      }));
    }
    if (household_contact_confirmed_case === null || household_contact_confirmed_case === undefined) {
      setRequiredInputStyle((prev) => ({
        ...prev,
        householdContactConfirmedCase: { borderWidth: '1px', borderStyle: 'solid', borderColor: 'red' },
      }));
    }
    if (been_in_health_unit === {} || been_in_health_unit === null || been_in_health_unit === undefined) {
      setRequiredInputStyle((prev) => ({
        ...prev,
        beenInHealthUnit: { borderWidth: '1px', borderStyle: 'solid', borderColor: 'red' },
      }));
    }
    if (
      had_evaluation_for_symptoms === {} ||
      had_evaluation_for_symptoms === null ||
      had_evaluation_for_symptoms === undefined
    ) {
      setRequiredInputStyle((prev) => ({
        ...prev,
        hadEvaluationForSymptoms: { borderWidth: '1px', borderStyle: 'solid', borderColor: 'red' },
      }));
    }
    if (covid_tested === {} || covid_tested === null || covid_tested === undefined) {
      setRequiredInputStyle((prev) => ({
        ...prev,
        covidTested: { borderWidth: '1px', borderStyle: 'solid', borderColor: 'red' },
      }));
    }
    setSnack({ type: 'error', message: 'Você precisa preencher todos os campos obrigatórios!' });
    setOpenSnack(true);
    return false;
  }

  function getImage(e) {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImages([...files]);
    }
  }

  return (
    <div style={{ overflow: 'auto' }}>
      <Header />
      <CustomSnackBar open={openSnack} setOpen={setOpenSnack} message={snack.message} type={snack.type} />
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
                  <p>{'E-mail*'}</p>
                  <input
                    placeholder={'E-mail'}
                    className={'col-md-12 form-control'}
                    value={email}
                    type={'e-mail'}
                    style={requiredInputStyle.email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setRequiredInputStyle((prev) => ({ ...prev, email: {} }));
                    }}
                  ></input>
                </div>
                <div className={'birthdate-container col-md-3'} style={requiredInputStyle.birthdate}>
                  <p>{'Data de nascimento'}</p>
                  <DatePicker
                    placeholderText="DD/MM/AAAA"
                    maxDate={new Date()}
                    className={'date-picker form-control'}
                    dateFormat={'dd/MM/yyyy'}
                    locale={'BR'}
                    selected={date}
                    onChange={(date) => {
                      handleBirthdate(date);
                      setRequiredInputStyle((prev) => ({ ...prev, birthdate: {} }));
                    }}
                    customInput={<MaskedInput mask="11/11/1111" />}
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
                  <FormControl
                    component={'fieldset'}
                    className="from-control"
                    style={requiredInputStyle.contactSuspectOrConfirmedCase}
                  >
                    <p>{'Você manteve contato com caso suspeito ou confirmado para COVID-19 nos últimos 14 dias?*'}</p>
                    <RadioGroup
                      aria-label={'q'}
                      name={'q1'}
                      value={contact_suspect_or_confirmed_case}
                      onChange={(e) => {
                        handleChangeQ1(e);
                        setRequiredInputStyle((prev) => ({ ...prev, contactSuspectOrConfirmedCase: {} }));
                      }}
                    >
                      <FormControlLabel value={'true'} control={<Radio />} label={'Sim'} />
                      <FormControlLabel value={'false'} control={<Radio />} label={'Não'} />
                    </RadioGroup>
                  </FormControl>
                  <FormControl
                    component={'fieldset'}
                    className={'col-md-9 from-control'}
                    style={requiredInputStyle.householdContactConfirmedCase}
                  >
                    <p>Você manteve contato domiciliar com caso confirmado por COVID-19 nos últimos 14 dias?*</p>
                    <RadioGroup
                      aria-label={'q'}
                      name={'q2'}
                      value={household_contact_confirmed_case}
                      onChange={(e) => {
                        handleChangeQ2(e);
                        setRequiredInputStyle((prev) => ({ ...prev, householdContactConfirmedCase: {} }));
                      }}
                    >
                      <FormControlLabel value={'true'} control={<Radio />} label={'Sim'} />
                      <FormControlLabel value={'false'} control={<Radio />} label={'Não'} />
                    </RadioGroup>
                  </FormControl>
                  <FormControl
                    component={'fieldset'}
                    className={'col-md-9 from-control'}
                    style={requiredInputStyle.beenInHealthUnit}
                  >
                    <p>{'Você esteve em alguma unidade de saúde nos 14 dias antes do início dos sintomas?*'}</p>
                    <RadioGroup
                      aria-label={'q'}
                      name={'q3'}
                      value={been_in_health_unit}
                      onChange={(e) => {
                        handleChangeQ3(e);
                        setRequiredInputStyle((prev) => ({ ...prev, beenInHealthUnit: {} }));
                      }}
                    >
                      <FormControlLabel value={'true'} control={<Radio />} label={'Sim'} />
                      <FormControlLabel value={'false'} control={<Radio />} label={'Não'} />
                    </RadioGroup>
                  </FormControl>
                  <FormControl
                    component={'fieldset'}
                    className={'col-md-9 from-control'}
                    style={requiredInputStyle.hadEvaluationForSymptoms}
                  >
                    <p>
                      {
                        'Você passou por alguma avaliação médica para tratar dos sintomas que você está apresentando no momento?*'
                      }
                    </p>
                    <RadioGroup
                      aria-label={'q'}
                      name={'q4'}
                      value={had_evaluation_for_symptoms}
                      onChange={(e) => {
                        handleChangeQ4(e);
                        setRequiredInputStyle((prev) => ({ ...prev, hadEvaluationForSymptoms: {} }));
                      }}
                    >
                      <FormControlLabel value={'true'} control={<Radio />} label={'Sim'} />
                      <FormControlLabel value={'false'} control={<Radio />} label={'Não'} />
                    </RadioGroup>
                  </FormControl>
                  <FormControl
                    component={'fieldset'}
                    className={'col-md-9 from-control'}
                    style={requiredInputStyle.covid19WasDiscarded}
                  >
                    <p>
                      {`Caso afirmativo para a questão anterior, a contaminação por COVID-19 foi descartada?${isRequiredQ5}`}
                    </p>
                    <RadioGroup
                      aria-label={'q'}
                      name={'q5'}
                      value={covid19_was_discarded}
                      onChange={(e) => {
                        handleChangeQ5(e);
                        setRequiredInputStyle((prev) => ({ ...prev, covid19WasDiscarded: {} }));
                      }}
                    >
                      <FormControlLabel value={'true'} control={<Radio />} label={'Sim'} />
                      <FormControlLabel value={'false'} control={<Radio />} label={'Não'} />
                    </RadioGroup>
                  </FormControl>
                  <FormControl
                    component={'fieldset'}
                    className={'col-md-9 from-control'}
                    style={requiredInputStyle.covidTested}
                  >
                    <p>{'Você fez algum exame para detectar o coronavírus?*'}</p>
                    <RadioGroup
                      aria-label={'q'}
                      name={'q6'}
                      value={covid_tested}
                      onChange={(e) => {
                        handleChangeQ6(e);
                        setRequiredInputStyle((prev) => ({ ...prev, covidTested: {} }));
                      }}
                    >
                      <FormControlLabel value={'true'} control={<Radio />} label={'Sim'} />
                      <FormControlLabel value={'false'} control={<Radio />} label={'Não'} />
                    </RadioGroup>
                  </FormControl>
                  <FormControl
                    component={'fieldset'}
                    className={'col-md-9 from-control'}
                    style={requiredInputStyle.covidResult}
                  >
                    <p>{`Caso afirmativo para a questão anterior, qual o resultado do exame?${isRequiredQ7}`}</p>
                    <RadioGroup
                      aria-label={'q'}
                      name={'q7'}
                      value={covid_result}
                      onChange={(e) => {
                        handleChangeQ7(e);
                        setRequiredInputStyle((prev) => ({ ...prev, covidResult: {} }));
                      }}
                    >
                      <FormControlLabel value={'true'} control={<Radio />} label={'Positivo'} />
                      <FormControlLabel value={'false'} control={<Radio />} label={'Negativo'} />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
              <FileInput images={images} getImage={getImage} uploadMessage={uploadMessage} />
            </form>
            <section className={'col-md-12'}>
              {/* <p>{'Nós precisaremos coletar sua localização. Por favor, autorize quando requisitado.'}</p> */}
              <button
                disabled={sendDisabled}
                onClick={handleNewWarning}
                className={'btn btn-primary col-md-12'}
                type={'submit'}
              >
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
