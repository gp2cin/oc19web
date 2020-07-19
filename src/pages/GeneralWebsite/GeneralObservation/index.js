import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import api from '../../../services/api';

import CustomSnackBar from '../../../components/CustomSnackBar';

import formatName from '../../../utils/formatName';

import CircularProgress from '@material-ui/core/CircularProgress';
import { uploadFile } from '../../../helpers/SendFileObservation';
import FileInput from '../../../components/FileInput';

export default function GeneralObservation() {
    const observer_name = '';
    const observer_email = '';
    const [city, setCity] = useState('');
    const [city_ca, setCity_ca] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [observation, setObservation] = useState('');
    const [neighborhood_name, setNeighborhood_name] = useState('');
    const image_url = '';
    const [images, setImages] = useState([]);
    //List of Recife's neighborhoods from backend
    const [neighborhooods, setNeighborhoods] = useState([]);
    //List of cities from IBGE API
    const [cities, setCities] = useState([]);
    const [isRecifeSelected, setIsRecifeSelected] = useState(false);

    const [info_source, setInfoSource] = useState('');
    const [info_source_link, setInfoSourceLink] = useState('');

    const [snack, setSnack] = useState({ type: 'success', message: '' });
    const [openSnack, setOpenSnack] = useState(false);
    const animatedComponents = makeAnimated();
    const [loading, setLoading] = useState(false);
    const [sendDisabled, setSendDisabled] = useState(false);
    const report_type = 'general';
    const [uploadMessage, setUploadMessage] = useState('');

    const [requiredInputStyle, setRequiredInputStyle] = useState({
        city: {},
        observation: {},
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
        if (city !== '' && observation !== '') {
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
            if (observation === '') {
                setRequiredInputStyle((prev) => ({ ...prev, observation: { borderColor: 'red' } }));
            }
            setSnack({ type: 'error', message: 'Você precisa preencher todos os campos obrigatórios!' });
            setOpenSnack(true);
            return false;
        }
    }

    function handleNewObserverReport() {
        if (isRequiredFilled()) {
            setSendDisabled(true);
            const data = {
                observer_name,
                observer_email,
                city,
                city_ca,
                neighborhood,
                neighborhood_name,
                info_source,
                info_source_link,
                report_type,
                observation,
                image_url,
            };
            postObservation(data);
        }
    }

    async function postObservation(data) {
        let errorMessage = 'Erro ao cadastrar observação.';
        try {
            const response = await api.post('api/v1/general-observation-auth', data);
            console.log(response);
            if (response.data.generalObservation && images.length > 0 && images !== undefined) {
                const error = await uploadFile({
                    setUploadMessage,
                    images,
                    id: response.data.generalObservation._id,
                    type: 'GeneralObservation',
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
            } else if (response.data.generalObservation) {
                setSnack({ type: 'success', message: 'Cadastrado com successo' });
                setOpenSnack(true);
                setSendDisabled(false);
                setTimeout(() => history.push('/'), 3000);
            } else {
                setSnack({ type: 'error', message: 'Erro ao cadastrar observação.' });
                setOpenSnack(true);
                setSendDisabled(false);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message && error.response.data.message === 'Token has expired') {
                setUploadMessage('');
                setSnack({ type: 'error', message: 'Seu login expirou. Faça login novamente' });
                setOpenSnack(true);
                setSendDisabled(false);
                console.log(data);
                setTimeout(() => history.push('/signin'), 3000);
            } else {
                setUploadMessage('');
                setSnack({ type: 'error', message: `${errorMessage} ${error}` });
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
            <div className="general-observation-container">
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
                    <div className="neighborhood col-md-6" style={{ padding: 0, paddingLeft: '10px' }}>
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
                <div className="source col-md-12">
                    <div className="info-source col-md-6" style={{ padding: 0, paddingRight: '10px' }}>
                        <p>Fonte da informação:</p>
                        <input
                            placeholder="Fonte da informação"
                            className="col-md-12 form-control"
                            value={info_source}
                            onChange={(e) => {
                                setInfoSource(e.target.value);
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
                <div className="comments col-md-12">
                    <div className="col-md-12" style={{ padding: '0px' }}>
                        <p>Observação:*</p>
                        <textarea
                            rows={10}
                            placeholder="Digite sua observação aqui"
                            className="col-md-12 form-control"
                            value={observation}
                            style={requiredInputStyle.observation}
                            onChange={(e) => {
                                setObservation(e.target.value);
                                setRequiredInputStyle((prev) => ({ ...prev, observation: {} }));
                            }}
                        ></textarea>
                    </div>
                </div>
                <FileInput images={images} getImage={getImage} uploadMessage={uploadMessage} />
                <section className={'col-md-12'}>
                    <button
                        disabled={sendDisabled}
                        onClick={handleNewObserverReport}
                        className={'btn btn-primary col-md-12'}
                        type={'button'}
                    >
                        {'Enviar'}
                    </button>
                </section>
            </div>
        </div>
    );
}
