import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import api from '../../services/api';
import { awsApi } from '../../services/api';
import formatName from '../../utils/formatName';

import CircularProgress from '@material-ui/core/CircularProgress';


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
    const [image, setImage] = useState();

    const animatedComponents = makeAnimated();
    const [loading, setLoading] = useState(false);
    const [sendDisabled, setSendDisabled] = useState(false);
    const report_type = 'general';
    const [uploadMessage, setUploadMessage] = useState('');

    const history = useHistory();

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


    async function handleCityChoice(choice) {
        if (choice !== null) {
            setCity(choice.label);
            setCity_ca(formatName(choice.label));
            //Get Recife's neighborhoods form backend
            if (choice.label === 'Recife') {
                console.log('Recife!!')
                setLoading(true);
                setIsRecifeSelected(true);
                try {
                    const response = await api.get('api/v1/neighborhoods?cidade=recife')
                    console.log(response);
                    if (response !== null) {
                        console.log('Resposta Recife!!')
                        console.log(response);
                        if (response.data !== null) {
                            console.log('Resposta Bairros!!')
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
                        console.log('BAIRROS NULOS')
                    }
                } catch (error) {
                    console.log(`Erro ao buscar bairros ${error}`)
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
        if (observer_name !== '' &&
            observer_email !== '' &&
            city !== '' &&
            neighborhood_name !== '' &&
            observation !== ''
        ) {
            return true;
        } else {
            alert('Você precisa preencher todos os campos obrigatórios!');
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
                observation,
                image_url
            }
            postObservation(data);
        }
    }

    function getImage(e) {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setImage(file);
        }
    };

    async function postObservation(data) {
        let errorMessage = 'Erro ao cadastrar observação.';
        try {
            const response = await api.post('api/v1/general-observation', data)
            console.log(response);
            if (response.data.generalObservation && image !== null && image !== undefined) {
                errorMessage = 'Observação cadastrada, mas erro ao buscar URL de cadastro da imagem.';
                console.log(response.data.generalObservation._id)
                setUploadMessage('Uploading...')
                const options = {
                    params: {
                        Key: response.data.generalObservation._id,
                        ContentType: image.type
                    },
                    headers: {
                        'Content-Type': image.type
                    }
                }
                const res = await api.get('api/v1/generate-put-url', options)
                if (res.data.putURL !== null && res.data.putURL !== undefined) {
                    console.log(res.data.putURL);
                    errorMessage = 'Observação cadastrada, mas erro ao cadastrar imagem da observação.';
                    await awsApi.put(res.data.putURL, image, options)
                    setUploadMessage('Upload Successful!')
                    alert('Cadastrado com sucesso');
                    setSendDisabled(false);
                    history.push('/');
                } else {
                    alert('Observação cadastrada, mas erro ao cadastrar imagem da observação.');
                    setSendDisabled(false);
                    history.push('/');
                }
            } else if (response.data.generalObservation) {
                alert('Cadastrado com sucesso2');
                setSendDisabled(false);
                history.push('/');
            } else {
                alert('Erro ao cadastrar observação.');
                setSendDisabled(false);
            }

        } catch (error) {
            setUploadMessage('');
            alert(`${errorMessage} ${error}`);
            setSendDisabled(false);
            console.log(data);
        }
    }

    return (
        <div>

            <div className="general-observation-container">
                <p>Campos com o símbolo " * " devem ser respondidos obrigatoriamente.</p>
                <div className="first-inputs col-md-12">
                    <div className="name col-md-6" style={{ padding: 0, paddingRight: '10px' }}>
                        <p>Seu nome:*</p>
                        <input
                            placeholder="Nome Sobrenome"
                            className="col-md-12 form-control"
                            value={observer_name}
                            onChange={(e) => set_observer_name(e.target.value)}
                        />
                    </div>
                    <div className="name col-md-6" style={{ padding: 0, paddingLeft: '10px' }}>
                        <p>Seu e-mail:*</p>
                        <input
                            placeholder="E-mail"
                            className="col-md-12 form-control"
                            value={observer_email}
                            onChange={(e) => set_observer_email(e.target.value)}
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
                            onChange={handleCityChoice}
                            options={cities}
                        />
                    </div>
                    <div className="neighborhood col-md-6" style={{ padding: 0, paddingLeft: '10px' }}>
                        <p>Bairro:*</p>
                        {
                            (!isRecifeSelected) &&
                            <input
                                placeholder="Bairro"
                                className="col-md-12 form-control"
                                value={neighborhood_name}
                                onChange={(e) => {
                                    setNeighborhood('');
                                    setNeighborhood_name(e.target.value);
                                }}
                            ></input>

                        }
                        {
                            (isRecifeSelected && !loading) &&
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
                        {
                            (isRecifeSelected && loading) &&
                            <CircularProgress />
                        }
                    </div>
                </div>
                <div className="comments col-md-12">
                    <div className="col-md-12" style={{ padding: '0px' }}>
                        <p>Observação:*</p>
                        <input
                            placeholder="Observação"
                            className="col-md-12 form-control"
                            value={observation}
                            onChange={(e) => setObservation(e.target.value)}
                        ></input>
                    </div>
                </div>

                <div
                    className="col-md-12 image"
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <p>Cadastro de imagem:</p>
                    <input
                        style={{ marginTop: '5px', padding: '0px' }}
                        id='upload-image'
                        className="upload-image col-md-12"
                        type='file'
                        accept='image/*'
                        onChange={(e) => getImage(e)}
                    />
                    <p>{uploadMessage}</p>
                </div>

                <section className={'col-md-12'}>
                    <button disabled={sendDisabled} onClick={handleNewObserverReport} className={'btn btn-primary col-md-12'} type={'button'}>
                        {'Enviar'}
                    </button>
                </section>
            </div>

        </div>
    );
}