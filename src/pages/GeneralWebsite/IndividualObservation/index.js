import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import DatePicker from 'react-datepicker';
import MaskedInput from 'react-maskedinput';
import api from '../../../services/api';

import CircularProgress from '@material-ui/core/CircularProgress';

import formatName from '../../../utils/formatName';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import CustomSnackBar from '../../../components/CustomSnackBar';
import FileInput from '../../../components/FileInput';
import { uploadFile } from '../../../helpers/SendFileObservation';

export default function IndividualObservation() {
  const [city, setCity] = useState('');
  const [city_ca, setCity_ca] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [neighborhood_name, setNeighborhood_name] = useState('');

  const [images, setImages] = useState([]);
  //List of Recife's neighborhoods from backend
  const [neighborhooods, setNeighborhoods] = useState([]);
  //List of cities from IBGE API
  const [cities, setCities] = useState([]);
  const [isRecifeSelected, setIsRecifeSelected] = useState(false);

  const animatedComponents = makeAnimated();
  const [loading, setLoading] = useState(false);
  const [sendDisabled, setSendDisabled] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  // Snack
  const [snack, setSnack] = useState({ type: 'success', message: '' });
  const [openSnack, setOpenSnack] = useState(false);
  const [case_type, setCaseType] = useState('');
  const [date, setDate] = useState();
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
      setCaseHouseholdContact(undefined);
    }
  };
  const [info_source, setInfoSource] = useState('');
  const [info_source_link, setInfoSourceLink] = useState('');
  const [general_comments, setGeneralComments] = useState('');
  const report_type = 'individual';
  const [requiredInputStyle, setRequiredInputStyle] = useState({
    city: {},
    caseGender: {},
    caseHadPreExistingDiseases: {},
    householdContactConfirmedCase: {},
    informationSource: {},
  });

  const history = useHistory();

  function getImage(e) {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImages([...files]);
    }
  }

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
      .then((res) => res.json())
      .then((data) => {
        console.log(cities);
        let arr = [];
        for (const i in data) {
          const itemToAdd = { value: `${data[i].id}`, label: `${data[i].nome}` };
          arr = [...arr, itemToAdd];
        }
        setCities(arr);
      })
      .catch((error) => {
        setSnack({
          type: 'error',
          message: 'Erro ao carregar cidades da API do IBGE. Verifique sua conexão e recarregue a página',
        });
        setOpenSnack(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        city_ca,
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
      };
      postObserverReport(data);
    }
  }

  async function postObserverReport(data) {
    try {
      const response = await api.post('api/v1/observer-report', data);

      const error = await uploadFile({ setUploadMessage, images, id: response.data.observerReport._id, type: 'individualObservation' });

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
      //console.log(data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message && error.response.data.message === 'Token has expired') {
        setSnack({ type: 'error', message: 'Seu login expirou. Faça login novamente' });
        setOpenSnack(true);
        setSendDisabled(false);
        console.log(data);
        setTimeout(() => history.push('/signin'), 3000);
      } else {
        setSnack({ type: 'error', message: 'Erro ao cadastrar, tente novamente' });
        setOpenSnack(true);
        setSendDisabled(false);
        console.log(data);
      }
    }
  }

  async function handleCityChoice(choice) {
    if (choice !== null) {
      setCity(choice.label);
      setCity_ca(formatName(choice.label));
      //Get Recife's neighborhoods form backend
      if (choice.label === 'Recife') {
        console.log('Recife!!');
        setLoading(true);
        setIsRecifeSelected(true);
        try {
          const response = await api.get('api/v1/neighborhoods?cidade=recife');
          console.log(response);
          if (response !== null) {
            console.log('Resposta Recife!!');
            console.log(response);
            if (response.data !== null) {
              console.log('Resposta Bairros!!');
              console.log(response.data);
              let arr = [];
              for (const i in response.data) {
                const itemToAdd = { value: `${response.data[i]._id}`, label: `${response.data[i].name}` };
                arr = [...arr, itemToAdd];
              }
              setNeighborhoods(arr);
              setLoading(false);
            } else {
              setLoading(false);
            }
          } else {
            setLoading(false);
            console.log('BAIRROS NULOS');
          }
        } catch (error) {
          console.log(`Erro ao buscar bairros ${error}`);
          setLoading(false);
        }
      } else {
        setNeighborhoods([]);
        setIsRecifeSelected(false);
        setLoading(false);
      }
    } else {
      setNeighborhoods([]);
      setIsRecifeSelected(false);
      setLoading(false);
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
      city !== '' &&
      info_source !== '' &&
      case_type !== '' &&
      case_gender !== '' &&
      caseHadPreExistingDiseases !== '' &&
      household_contact_confirmed_case !== ''
    ) {
      return true;
    } else {
      if (city === '') {
        setRequiredInputStyle((prev) => ({
          ...prev,
          city: {
            control: (base, state) => ({
              ...base,
              borderColor: 'red',
            }),
          },
        }));
      }
      if (info_source === '') {
        setRequiredInputStyle((prev) => ({ ...prev, informationSource: { borderColor: 'red' } }));
      }
      if (case_type === '') {
        setRequiredInputStyle((prev) => ({
          ...prev,
          caseType: { borderWidth: '1px', borderStyle: 'solid', borderColor: 'red' },
        }));
      }
      if (case_gender === '') {
        setRequiredInputStyle((prev) => ({
          ...prev,
          caseGender: { borderWidth: '1px', borderStyle: 'solid', borderColor: 'red' },
        }));
      }
      if (household_contact_confirmed_case === null || household_contact_confirmed_case === undefined) {
        setRequiredInputStyle((prev) => ({
          ...prev,
          caseHadPreExistingDiseases: { borderWidth: '1px', borderStyle: 'solid', borderColor: 'red' },
        }));
      }
      if (household_contact_confirmed_case === null || household_contact_confirmed_case === undefined) {
        setRequiredInputStyle((prev) => ({
          ...prev,
          householdContactConfirmedCase: { borderWidth: '1px', borderStyle: 'solid', borderColor: 'red' },
        }));
      }
      setSnack({ type: 'error', message: 'Você precisa preencher todos os campos obrigatórios' });
      setOpenSnack(true);
      return false;
    }
  }

  function handleNeighborhoodChoice(choice) {
    if (choice !== null) {
      setNeighborhood(choice.value);
      setNeighborhood_name(choice.label);
    }
  }

  return (
    <div>
      <CustomSnackBar open={openSnack} setOpen={setOpenSnack} message={snack.message} type={snack.type} />
      <div className="individual-observation-container">
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
              styles={requiredInputStyle.city}
              onChange={(e) => {
                handleCityChoice(e);
                setRequiredInputStyle((prev) => ({ ...prev, city: {} }));
              }}
              options={cities}
            />
          </div>
          <div className="neighborhood col-md-6" style={{ padding: 0, paddingRight: '10px' }}>
            <p>Bairro:*</p>
            {!isRecifeSelected && (
              <input
                placeholder="Bairro"
                className="col-md-12 form-control"
                value={neighborhood_name}
                onChange={(e) => {
                  setNeighborhood('');
                  setNeighborhood_name(e.target.value);
                }}
              ></input>
            )}
            {isRecifeSelected && !loading && (
              <Select
                className="select"
                placeholder="Escolha"
                closeMenuOnSelect={true}
                components={animatedComponents}
                defaultValue={[]}
                isClearable
                isSearchable
                onChange={(e) => {
                  handleNeighborhoodChoice(e);
                }}
                options={neighborhooods}
              />
            )}
            {isRecifeSelected && loading && <CircularProgress />}
          </div>
        </div>
        <div className="individual-info col-md-12">
          <div className="case-type col-md-9" style={requiredInputStyle.caseType}>
            <FormControl component={'fieldset'} className="col-md-9">
              <p>{'Tipo de caso:*'}</p>
              <RadioGroup
                aria-label={'q'}
                name={'q2'}
                value={case_type}
                onChange={(e) => {
                  setCaseType(e.target.value);
                  setRequiredInputStyle((prev) => ({ ...prev, caseType: {} }));
                }}
              >
                <FormControlLabel value={'suspect'} control={<Radio />} label={'Caso Suspeito'} />
                <FormControlLabel value={'confirmed'} control={<Radio />} label={'Caso Confirmado'} />
                <FormControlLabel value={'death'} control={<Radio />} label={'Óbito'} />
              </RadioGroup>
            </FormControl>
          </div>
          {case_type === 'death' && (
            <div className="death-date col-md-9">
              <p>{'Data do óbito:'}</p>
              <DatePicker
                placeholderText="DD/MM/AAAA"
                maxDate={new Date()}
                className={'date-picker form-control'}
                dateFormat={'dd/MM/yyyy'}
                locale={'BR'}
                selected={date}
                onChange={(date) => handleDeathDate(date)}
                customInput={<MaskedInput mask="11/11/1111" />}
              />
            </div>
          )}
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
          <div className="gender col-md-9" style={requiredInputStyle.caseGender}>
            <FormControl component={'fieldset'} className="col-md-9">
              <p>{'Sexo:*'}</p>
              <RadioGroup
                aria-label={'q'}
                name={'q3'}
                value={case_gender}
                onChange={(e) => {
                  setCaseGender(e.target.value);
                  setRequiredInputStyle((prev) => ({ ...prev, caseGender: {} }));
                }}
              >
                <FormControlLabel value={'male'} control={<Radio />} label={'Masculino'} />
                <FormControlLabel value={'female'} control={<Radio />} label={'Feminino'} />
                <FormControlLabel value={'not-known'} control={<Radio />} label={'Não sei informar'} />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="had-pre-existing-diseases col-md-9" style={requiredInputStyle.caseHadPreExistingDiseases}>
            <FormControl component={'fieldset'} className="col-md-9">
              <p>{'O paciente tinha alguma doença preexistente?*'}</p>
              <RadioGroup
                aria-label={'q'}
                name={'q4'}
                value={caseHadPreExistingDiseases}
                onChange={(e) => {
                  setCaseHadPreExistingDiseases(e.target.value);
                  setRequiredInputStyle((prev) => ({ ...prev, caseHadPreExistingDiseases: {} }));
                }}
              >
                <FormControlLabel value={'yes'} control={<Radio />} label={'Sim'} />
                <FormControlLabel value={'no'} control={<Radio />} label={'Não'} />
                <FormControlLabel value={'not-known'} control={<Radio />} label={'Não sei informar'} />
              </RadioGroup>
            </FormControl>
          </div>
          {caseHadPreExistingDiseases === 'yes' && (
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
          )}
          <div className="had-household-contact col-md-9" style={requiredInputStyle.householdContactConfirmedCase}>
            <FormControl component={'fieldset'} className="col-md-9">
              <p>{'O paciente manteve contato domiciliar com caso confirmado por COVID-19 nos últimos 14 dias?*'}</p>
              <RadioGroup
                aria-label={'q'}
                name={'q5'}
                value={household_contact_confirmed_case}
                onChange={(e) => {
                  handleChangeQ5(e);
                  setRequiredInputStyle((prev) => ({ ...prev, householdContactConfirmedCase: {} }));
                }}
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
                placeholder="Fonte da informação*"
                className="col-md-12 form-control"
                style={requiredInputStyle.informationSource}
                value={info_source}
                onChange={(e) => {
                  setInfoSource(e.target.value);
                  setRequiredInputStyle((prev) => ({ ...prev, informationSource: {} }));
                }}
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

        <FileInput images={images} getImage={getImage} uploadMessage={uploadMessage} />

        <section className={'col-md-12'}>
          <button
            disabled={sendDisabled}
            onClick={handleNewObserverReport}
            className={'btn btn-primary col-md-12'}
            type={'submit'}
          >
            {'Enviar'}
          </button>
        </section>
      </div>
    </div>
  );
}
