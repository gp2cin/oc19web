import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import api from '../../../services/api';
import { awsApi } from '../../../services/api';
import CustomSnackBar from '../../../components/CustomSnackBar';
import formatName from '../../../utils/formatName';

import CircularProgress from '@material-ui/core/CircularProgress';

import FileInput from '../../../components/FileInput';

export default function GeneralObservation() {
    const [observer_name, set_observer_name] = useState('');
    const [observer_email, set_observer_email] = useState('');
    const [city, setCity] = useState('');
    const [city_ca, setCity_ca] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [observation, setObservation] = useState('');
    const [neighborhood_name, setNeighborhood_name] = useState('');
    const image_url = '';
    //List of Recife's neighborhoods from backend
    const [neighborhooods, setNeighborhoods] = useState([]);
    //List of cities from IBGE API
    const [cities, setCities] = useState([]);
    const [isRecifeSelected, setIsRecifeSelected] = useState(false);
    const [images, setImages] = useState([]);

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
        observerName: {},
        observerEmail: {},
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
        if (observer_name !== '' && observer_email !== '' && city !== '' && observation !== '') {
            return true;
        } else {
            if (observer_name === '') {
                setRequiredInputStyle((prev) => ({ ...prev, observerName: { borderColor: 'red' } }));
            }
            if (observer_email === '') {
                setRequiredInputStyle((prev) => ({ ...prev, observerEmail: { borderColor: 'red' } }));
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
                report_type,
                info_source,
                info_source_link,
                observation,
                image_url,
            };
            postObservation(data);
        }
    }

    async function postObservation(data) {
        let errorMessage = 'Erro ao cadastrar observação.';
        try {
            const response = await api.post('api/v1/general-observation', data);
            console.log(response);
            if (response.data.generalObservation && images.length > 0 && images !== undefined) {
                errorMessage = 'Observação cadastrada, mas erro ao buscar URL de cadastro da imagem.';
                console.log(response.data.generalObservation._id);
                setUploadMessage('Carregando ...');
                let error = false;

                for (const index in images) {
                    const image = images[index];
                    if (image !== undefined) {
                        let folder;
                        switch (process.env.REACT_APP_TYPE) {
                            case 'dev':
                                folder = 'testes/';
                                break;
                            case 'prod':
                                folder = 'producao/';
                                break;
                            case 'homolog':
                                folder = 'homologacao/';
                                break;

                            default:
                                folder = 'testes/';
                                break;
                        }

                        const options = {
                            params: {
                                Key: folder + response.data.generalObservation._id + '/' + image.name,
                                ContentType: image.type,
                            },
                            headers: {
                                'Content-Type': image.type,
                            },
                        };
                        const res = await api.get('api/v1/generate-put-url', options);
                        if (res.data.putURL !== null && res.data.putURL !== undefined) {
                            console.log(res.data.putURL);
                            errorMessage = 'Observação cadastrada, mas erro ao cadastrar imagem da observação.';
                            await awsApi.put(res.data.putURL, image, options);
                            setUploadMessage('Upload Successful!');
                        } else {
                            error = true;
                        }
                    }
                }

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
            setUploadMessage('');
            setSnack({ type: 'error', message: `${errorMessage} ${error}` });
            setOpenSnack(true);
            setSendDisabled(false);
            console.log(data);
        }
    }

    return (
        <div>
            <CustomSnackBar open={openSnack} setOpen={setOpenSnack} message={snack.message} type={snack.type} />
            <div className="general-observation-container">
                <p>Campos com o símbolo " * " devem ser respondidos obrigatoriamente.</p>
                <div className="first-inputs col-md-12">
                    <div className="name col-md-6" style={{ padding: 0, paddingRight: '10px' }}>
                        <p>Seu nome:*</p>
                        <input
                            placeholder="Nome Sobrenome"
                            className="col-md-12 form-control"
                            value={observer_name}
                            style={requiredInputStyle.observerName}
                            onChange={(e) => {
                                set_observer_name(e.target.value);
                                setRequiredInputStyle((prev) => ({ ...prev, observerName: {} }));
                            }}
                        />
                    </div>
                    <div className="name col-md-6" style={{ padding: 0, paddingLeft: '10px' }}>
                        <p>Seu e-mail:*</p>
                        <input
                            placeholder="E-mail"
                            className="col-md-12 form-control"
                            value={observer_email}
                            style={requiredInputStyle.observerEmail}
                            onChange={(e) => {
                                set_observer_email(e.target.value);
                                setRequiredInputStyle((prev) => ({ ...prev, observerEmail: {} }));
                            }}
                        />
                    </div>
                </div>

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

                <FileInput images={images} setImages={setImages} uploadMessage={uploadMessage} setUploadMessage={setUploadMessage} />

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
