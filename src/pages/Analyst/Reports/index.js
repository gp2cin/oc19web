import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { Select, Paper, Grid, Typography, Button, CircularProgress, TextField } from '@material-ui/core';

import MenuItem from '@material-ui/core/MenuItem';
// import ReportTable from './ReportTable';
import api from '../../../services/api';

import Table2 from './Table2';

import { cities } from './data';
import { DatePicker } from '@material-ui/pickers';
import moment from 'moment';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ marginTop: 16 }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Reports() {
  // const classes = useStyles();

  const agentType = ['Observador', 'Indivíduo'];
  const observerTypes = ['Observações Gerais', 'Observações individuais', 'Observações em lote'];
  const userTypes = ['Auto-casos', 'Observações Gerais'];

  const [value, setValue] = React.useState(0);
  const [observerType, setObserverType] = React.useState(0);
  const [secondBar, setSecondBar] = React.useState(observerTypes);
  const [actualConfig, setActualConfig] = React.useState({ agent: agentType[0], type: secondBar[0] });

  const [city, setCity] = React.useState(cities[0]);
  const [openSelectNeighborhood, setOpenSelectNeighborhood] = React.useState(false);

  const [neighborhoodList, setNeighborhoodList] = React.useState([]);
  const [loadingList, setLoadingList] = React.useState(false);

  const [neighborhood, setNeighborhood] = React.useState('');
  const [dataRange, setDataRange] = React.useState(moment());

  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    getData();
  }, []);

  // Ao selecionar uma cidade
  useEffect(() => {
    openSelectNeighborhood && getNeighborhoods();
  }, [openSelectNeighborhood]);

  const getNeighborhoods = async () => {
    setLoadingList(true);
    const response = await api.get('api/v1/neighborhoods?cidade=recife');
    const list = response.data.map(({ name }) => name);
    try {
      setNeighborhoodList(list);
      setNeighborhood(list[0]);
    } catch (error) {}
    setLoadingList(false);
  };

  const handleChange = (e, newValue) => {
    setValue(e.target.value);
    setObserverType(0);
    setSecondBar(newValue.props.value === 0 ? observerTypes : userTypes);
  };

  const handleSearch = () => {
    setActualConfig({ agent: agentType[value], type: secondBar[observerType] });
    getData();
  };

  const changeObserverType = (e) => {
    setObserverType(e.target.value);
  };

  const getData = async () => {
    setLoading(true);

    if (value === 0) {
      if (observerTypes[observerType] === 'Observações Gerais') {
        const filters = {
          agentType: agentType[value],
          observerType: secondBar[observerType],
          city,
          neighborhood,
        };
        const response = await api.get('api/v1/general-observations', { params: filters });

        setData(response.data.generalObservations);
      }
    }
    setLoading(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper style={{ padding: 15 }}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <Grid container direction="row" alignItems="center" spacing={3}>
                <Grid item>
                  <Grid container direction="row" spacing={2}>
                    <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>Agente</Typography>
                    </Grid>
                    <Grid item>
                      <Select
                        value={value}
                        margin="dense"
                        variant="outlined"
                        onChange={handleChange}
                        style={{ width: 150 }}
                      >
                        {agentType.map((name, index) => {
                          return <MenuItem value={index}>{name}</MenuItem>;
                        })}
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container direction="row" spacing={2}>
                    <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>Tipo: </Typography>
                    </Grid>
                    <Grid item>
                      <Select
                        value={observerType}
                        margin="dense"
                        variant="outlined"
                        onChange={changeObserverType}
                        style={{ width: 220 }}
                      >
                        {secondBar.map((name, i) => {
                          return <MenuItem value={i}>{name}</MenuItem>;
                        })}
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container direction="row" spacing={2}>
                    <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>Cidade: </Typography>
                    </Grid>
                    <Grid item>
                      <Select
                        value={city}
                        margin="dense"
                        variant="outlined"
                        onChange={(e, data) => {
                          setCity(data.props.value);
                          if (data.props.value === 'Recife') {
                            setOpenSelectNeighborhood(true);
                          }
                        }}
                        style={{ width: 220 }}
                      >
                        {cities.map((name) => {
                          return (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container direction="row" spacing={2}>
                    <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>Bairro: </Typography>
                    </Grid>
                    <Grid item>
                      {openSelectNeighborhood ? (
                        <>
                          {loadingList ? (
                            <CircularProgress />
                          ) : (
                            <Select
                              value={neighborhood}
                              margin="dense"
                              variant="outlined"
                              onChange={(e, data) => setNeighborhood(data.props.value)}
                              style={{ width: 220 }}
                            >
                              {neighborhoodList.map((name) => {
                                return (
                                  <MenuItem key={name} value={name}>
                                    {name}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          )}
                        </>
                      ) : (
                        <TextField />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container direction="row" alignItems="center" spacing={3}>
                <Grid item>
                  <Grid container alignItems="center" direction="row" spacing={2}>
                    <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>Data</Typography>
                    </Grid>
                    <Grid item>
                      <DatePicker
                        margin="dense"
                        inputVariant="outlined"
                        format="DD/MM/yyyy"
                        value={dataRange}
                        onChange={setDataRange}
                        animateYearScrolling
                      />
                    </Grid>
                    <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography> para </Typography>
                    </Grid>
                    <Grid item>
                      <DatePicker
                        margin="dense"
                        inputVariant="outlined"
                        format="DD/MM/yyyy"
                        value={dataRange}
                        onChange={setDataRange}
                        animateYearScrolling
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Button variant="outlined" onClick={() => handleSearch()}>
                    Buscar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        {loading ? (
          <Grid container alignItems="center" justify="center">
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        ) : (
          // <ReportTable agent={actualConfig.agent} type={actualConfig.type} data={data} />
          <Table2 agent={actualConfig.agent} type={actualConfig.type} data={data} />
        )}
      </Grid>
    </Grid>
  );
}
