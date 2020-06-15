import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Container from '@material-ui/core/Container';
import api from '../../services/api';
import { isAuthenticated } from '../../services/auth';
import CustomSnackBar from '../../components/CustomSnackBar';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tab: {
    '&:focus': {
      outline: 0,
    },
  },
}));

export default function MyAccount() {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState(0);
  const [password, setPassword] = useState();
  const [confirm_password, setConfirmPassword] = useState();
  const name = localStorage.getItem('NAME');
  const email = localStorage.getItem('EMAIL');

  // Snack
  const [snack, setSnack] = useState({ type: 'sucess', message: '' });
  const [openSnack, setOpenSnack] = useState(false);

  async function handleChangePassword(e) {
    try {
      e.preventDefault();
      if (password !== confirm_password) {
        setSnack({ type: 'error', message: 'Preencha os campos com a mesma senha' });
        setOpenSnack(true);
      } else {
        const response = await api.post('api/v1/me/change-password', { password });
        console.log(response);
        if (response.data.message === 'Password changed') {
          setSnack({ type: 'success', message: 'Senha trocada com sucesso' });
          setOpenSnack(true);
          history.push('/my-account');
          setPassword('');
          setConfirmPassword('');
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  function handleAuth() {
    if (!isAuthenticated()) {
      history.push('/');
    }
  }

  return (
    <Container style={{ marginTop: '40px' }} onChange={handleAuth()}>
      <Header />
      <CustomSnackBar open={openSnack} setOpen={setOpenSnack} message={snack.message} type={snack.type} />
      <div style={{ minHeight: '300px' }}>
        <h1> Minha Conta </h1>
        <div style={{ display: 'flex' }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs"
            className={classes.tabs}
          >
            <Tab label="Minha Conta" {...a11yProps(0)} className={classes.tab} />
            <Tab label="Trocar Senha" {...a11yProps(1)} className={classes.tab} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <p> Nome: {`${name}`}</p>
            <p> Email: {`${email}`}</p>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <form>
              <div className={'form-group'}>
                <label className={'form-label'}>{'Nova Senha:'}</label>
                <input
                  required
                  className={'form-control'}
                  type={'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></input>
              </div>
              <div className={'form-group'}>
                <label className={'form-label'}>{'Confirmar Nova Senha:'}</label>
                <input
                  required
                  className={'form-control'}
                  type={'password'}
                  value={confirm_password}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                ></input>
              </div>
              <button className={'btn btn-primary col-md-12'} type={'submit'} onClick={handleChangePassword}>
                {'Trocar Senha'}
              </button>
            </form>
          </TabPanel>
        </div>
      </div>
      <Footer />
    </Container>
  );
}
