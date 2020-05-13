import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { login, logout } from '../../services/auth';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import DatePicker from 'react-datepicker';

import Logo from '../../assets/ocovid19-logo.png';
import { Container, Form } from './styles';

export default function SignUp() {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [first_name, set_first_name] = useState('');
    const [last_name, set_last_name] = useState('');
    const [gender, setGender] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [controlDate, setControlDate] = useState(new Date());

    const history = useHistory();

    function handleBirthdate(d) {
        if (d !== null) {
            const s = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
            setControlDate(d);
            setBirthdate(s);
        }
    }

    function validateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return true;
        }
        alert('Você preencheu um endereço de e-mail invávido!');
        return false;
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (email == '' ||
            password == '' ||
            first_name == '' ||
            last_name == '' ||
            gender == '' ||
            birthdate == '') {
            setError('Preencha todos os dados para entrar');
        } else {
            try {
                const response = await api.post("api/v1/signup", { email, password, first_name, last_name, gender, birthdate });
                login(response.data.token);
                history.push('/app');
            } catch (error) {
                console.log(error);
                setError("Ocorreu um erro ao registrar sua conta.");
            }
        }
    }

    return (
        <Container>
            <Form onSubmit={handleSignUp}>
                <img src={Logo} alt="OC19 logo" />
                {error && <p className="error">{error}</p>}
                <input
                    type={'email'}
                    placeholder={'Endereço de e-mail'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type={'password'}
                    placeholder={'Senha'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    placeholder={'Primeiro nome'}
                    value={first_name}
                    onChange={(e) => set_first_name(e.target.value)}
                />
                <input
                    placeholder={'Último nome'}
                    value={last_name}
                    onChange={(e) => set_last_name(e.target.value)}
                />
                <div className="report-type">
                    <FormControl component={'fieldset'}>
                        <p>{'Gênero'}</p>
                        <RadioGroup
                            aria-label={'q'}
                            name={'q1'}
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <FormControlLabel value={'male'} control={<Radio />} label={'Masculino'} />
                            <FormControlLabel value={'female'} control={<Radio />} label={'Feminino'} />
                            <FormControlLabel value={'other'} control={<Radio />} label={'Outro'} />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="birthdate">
                    <p>{'Data de nascimento'}</p>
                    <DatePicker
                        maxDate={new Date()}
                        className={'date-picker form-control'}
                        dateFormat={'dd/MM/yyyy'}
                        locale={'BR'}
                        selected={controlDate}
                        onChange={(controlDate) => handleBirthdate(controlDate)}
                    />
                </div>
                <button className="button" type={'submit'}>Cadastrar</button>
            </Form>
        </Container>
    );
}