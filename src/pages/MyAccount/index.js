import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Container from '@material-ui/core/Container';

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
}));
export default function MyAccount() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container style={{ marginTop: "40px" }}>
            <Header />
            <div style={{ minHeight: "300px" }}>
                <h1> Minha Conta </h1>
                <div style={{ display: "flex" }}>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs"
                        className={classes.tabs}
                    >
                        <Tab label="Minha Conta" {...a11yProps(0)} />
                        <Tab label="Trocar Senha" {...a11yProps(1)} />
                        <Link to="/">
                            <Tab label="Sair" {...a11yProps(2)} />
                        </Link>
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <p> Nome: Pedro Sena</p>
                        <p> Email: teste@email.com</p>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <form>
                            <div className={'form-group'}>
                                <label className={'form-label'}>{'Nova Senha:'}</label>
                                <input
                                    className={'form-control'}
                                    type={'password'}
                                ></input>
                            </div>
                            <div className={'form-group'}>
                                <label className={'form-label'}>{'Confirmar Nova Senha:'}</label>
                                <input
                                    className={'form-control'}
                                    type={'password'}
                                ></input>
                            </div>
                            <button className={'btn btn-primary col-md-12'} type={'submit'}>
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