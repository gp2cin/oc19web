import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FiUserPlus } from 'react-icons/fi';
import api from '../../../services/api';
import { login } from '../../../services/auth';
import Header from '../../../components/Header';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import DatePicker from 'react-datepicker';

import Logo from '../../../assets/ocovid19-logo.png';
import useStyles from './styles';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link to="/" color="inherit">
                OCovid-19
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignUp() {
    const classes = useStyles();
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [controlDate, setControlDate] = useState();

    const history = useHistory();

    function handleBirthdate(d) {
        if (d !== null) {
            const s = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
            setControlDate(d);
            setBirthdate(s);
        }
    }

    function validateEmail(mail) {
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return true;
        }
        alert('Você preencheu um endereço de e-mail invávido!');
        return false;
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (email === '' ||
            password === '' ||
            name === '' ||
            gender === '' ||
            birthdate === '') {
            setError('Preencha todos os dados para entrar');
        } else {
            if (validateEmail(email)) {
                try {
                    const response = await api.post("api/v1/signup", { email, password, name, gender, birthdate });
                    login(response.data.token);
                    alert('Cadastro efetuado com sucesso.');
                    history.push('/');
                } catch (error) {
                    console.log(error);
                    setError("Ocorreu um erro ao registrar sua conta.");
                }
            }
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Header />
            <div className={classes.paper}>
                <img src={Logo} alt="OC19 logo" width="150px" />
                <Typography component="h1" variant="h5">
                    <FiUserPlus size={25} /> Cadastre-se
                </Typography>
                {error && <p id="error">{error}</p>}
                <form onSubmit={handleSignUp}>
                    <div className={'form-group'}>
                        <label className={'form-label'}>{'Nome*'}</label>
                        <input
                            placeholder={'Nome'}
                            className={'form-control'}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </div>
                    <div className={'form-group'}>
                        <label className={'form-label'}>{'E-mail*'}</label>
                        <input
                            placeholder={'example@email.com'}
                            className={'form-control'}
                            value={email}
                            type={'e-mail'}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                    </div>
                    <div className={'form-group'}>
                        <label className={'form-label'}>{'Senha*'}</label>
                        <input
                            placeholder={'Senha'}
                            className={'form-control'}
                            type={'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </div>
                    <div className={'form-group'}>
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
                    <div className={'form-group'}>
                        <label className={'form-label'}>{'Data de Nascimento*'}</label>
                        <DatePicker
                            maxDate={new Date()}
                            className={'date-picker form-control ml-1'}
                            dateFormat={'dd/MM/yyyy'}
                            locale={'BR'}
                            selected={controlDate}
                            onChange={(controlDate) => handleBirthdate(controlDate)}
                        />
                    </div>
                    <button className={'btn btn-primary col-md-12'} type={'submit'}>
                        {'Cadastrar'}
                    </button>
                    <Grid container>
                        <Grid item>
                            <Link to="/signin" variant="body2">
                                Já tem uma conta? Faça o login.
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Copyright />
        </Container>
    );
}