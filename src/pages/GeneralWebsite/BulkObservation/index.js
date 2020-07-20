import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import api from '../../../services/api';
import CustomSnackBar from '../../../components/CustomSnackBar';

import formatName from '../../../utils/formatName';

import CircularProgress from '@material-ui/core/CircularProgress';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { uploadFile } from '../../../helpers/SendFileObservation';
import FileInput from '../../../components/FileInput';

export default function BulkObservation() {
    const [city, setCity] = useState('');
    const [city_ca, setCity_ca] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [neighborhood_name, setNeighborhood_name] = useState('');
    //List of Recife's neighborhoods from backend
    const [neighborhooods, setNeighborhoods] = useState([]);
    //List of cities from IBGE API
    const [cities, setCities] = useState([]);
    const [isRecifeSelected, setIsRecifeSelected] = useState(false);

    const [images, setImages] = useState([]);
    const [uploadMessage, setUploadMessage] = useState('');

    const [snack, setSnack] = useState({ type: 'success', message: '' });
    const [openSnack, setOpenSnack] = useState(false);
    const animatedComponents = makeAnimated();
    const [loading, setLoading] = useState(false);
    const [sendDisabled, setSendDisabled] = useState(false);

    const [case_type, setCaseType] = useState('');
    const death_date = '';
    const case_name = '';
    const case_age = '';
    const case_gender = '';

    const [info_source, setInfoSource] = useState('');
    const [info_source_link, setInfoSourceLink] = useState('');
    const [general_comments, setGeneralComments] = useState('');
    const [number_of_cases, setNumberOfCases] = useState(0);
    const report_type = 'social';

    const [requiredInputStyle, setRequiredInputStyle] = useState({
        city: {},
        numberOfCases: {},
        informationSource: {},
        caseType: {},
    });

    const history = useHistory();

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
                    message: `Erro ao carregar cidades da API do IBGE. Verifique sua conexão e recarregue a página. ${error}`,
                });
                setOpenSnack(true);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    function handleNeighborhoodChoice(choice) {
        if (choice !== null) {
            setNeighborhood(choice.value);
            setNeighborhood_name(choice.label);
        }
    }

    function isRequiredFilled() {
        if (
            city !== '' &&
            case_type !== '' &&
            number_of_cases !== 0 &&
            number_of_cases !== '' &&
            number_of_cases !== '0' &&
            info_source !== ''
        ) {
            return true;
        }

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
        if (case_type === '') {
            setRequiredInputStyle((prev) => ({
                ...prev,
                caseType: { borderWidth: '1px', borderStyle: 'solid', borderColor: 'red' },
            }));
        }
        if (number_of_cases === 0 || number_of_cases === '' || number_of_cases === '0') {
            setRequiredInputStyle((prev) => ({ ...prev, numberOfCases: { borderColor: 'red' } }));
        }
        if (info_source === '') {
            setRequiredInputStyle((prev) => ({ ...prev, informationSource: { borderColor: 'red' } }));
        }
        setSnack({ type: 'error', message: 'Você precisa preencher todos os campos obrigatórios!' });
        setOpenSnack(true);
        return false;
    }

    function handleNewObserverReport(e) {
        e.preventDefault();
        if (isRequiredFilled()) {
            setSendDisabled(true);
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
                info_source,
                info_source_link,
                general_comments,
                number_of_cases,
            };
            postObserverReport(data);
        }
    }

    async function postObserverReport(data) {
        try {
            const response = await api.post('api/v1/observer-report', data);
            console.log(response);
            let hasError = false;

            for (const i in response.data.resp.insertedIds) {
                const id = response.data.resp.insertedIds[i];
                const error = await uploadFile({
                    setUploadMessage,
                    images,
                    id: id,
                    type: 'bulkObservation',
                });
                if (error) hasError = true;
            }

            if (!hasError) {
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

    function getImage(e) {
        const files = e.target.files;
        if (files && files.length > 0) {
            setImages([...files]);
        }
    }

    return (
        <div>
            <CustomSnackBar open={openSnack} setOpen={setOpenSnack} message={snack.message} type={snack.type} />
            <div className="bulk-observation-container">
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
                            onChange={(e) => {
                                handleCityChoice(e);
                                setRequiredInputStyle((prev) => ({ ...prev, city: {} }));
                            }}
                            options={cities}
                            styles={requiredInputStyle.city}
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
                <div className="social-info col-md-12">
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
                                onChange={(e) => {
                                    setNumberOfCases(e.target.value);
                                    setRequiredInputStyle((prev) => ({ ...prev, numberOfCases: {} }));
                                }}
                                style={requiredInputStyle.numberOfCases}
                            ></input>
                        </div>
                        <div className="info-source col-md-6" style={{ padding: 0, paddingLeft: '10px' }}>
                            <p>Fonte da informação:*</p>
                            <input
                                placeholder="Fonte da informação"
                                className="col-md-12 form-control"
                                value={info_source}
                                onChange={(e) => {
                                    setInfoSource(e.target.value);
                                    setRequiredInputStyle((prev) => ({ ...prev, informationSource: {} }));
                                }}
                                style={requiredInputStyle.informationSource}
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
