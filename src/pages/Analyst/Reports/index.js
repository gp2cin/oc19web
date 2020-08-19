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
  const agentType = ['Observador', 'Indivíduo', 'Todos'];
  const observerTypes = ['Observações Gerais', 'Observações Individuais', 'Observações em Lote'];
  const userTypes = ['Auto Casos', 'Observações Gerais'];

  const [value, setValue] = React.useState(0);
  const [observerType, setObserverType] = React.useState(0);
  const [secondBar, setSecondBar] = React.useState(observerTypes);
  const [actualConfig, setActualConfig] = React.useState({ agent: agentType[0], type: secondBar[0] });

  const [city, setCity] = React.useState();
  const [openSelectNeighborhood, setOpenSelectNeighborhood] = React.useState(false);

  const [neighborhoodList, setNeighborhoodList] = React.useState([]);
  const [loadingList, setLoadingList] = React.useState(false);

  const [neighborhood, setNeighborhood] = React.useState('');

  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);

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
      // setNeighborhood(list[0]);
    } catch (error) {}
    setLoadingList(false);
  };

  const handleChange = (e, newValue) => {
    setValue(e.target.value);
    setObserverType(0);
    setSecondBar(newValue.props.value === 0 ? observerTypes : userTypes);
  };

  const handleSearch = () => {
    setActualConfig({ agent: agentType[value], type: observerType === 2 ? '' : secondBar[observerType] });
    getData();
  };

  const changeObserverType = (e) => {
    setObserverType(e.target.value);
  };

  const getData = async (noHaveFilters) => {
    try {
      setLoading(true);

      let filters = {
        agentType: agentType[value],
        observerType: secondBar[observerType],
      };
      if (!noHaveFilters) {
        filters = {
          ...filters,
          city,
          neighborhood,
          fromDate,
          toDate,
        };
      }

      const response = await api.get('api/v1/dashboard/filters', { params: filters });

      setData(response.data);

      setLoading(false);
    } catch (error) {
      setData([]);
    }
  };

  const clearFilters = () => {
    setValue(0);
    setObserverType(0);

    setCity('');
    setNeighborhood('');
    setFromDate(null);
    setToDate(null);
    getData(true);
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
                {value !== 2 && (
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
                )}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row" alignItems="center" spacing={3}>
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
                        <TextField margin="dense" id="outlined-basic" variant="outlined" />
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
                        value={fromDate}
                        onChange={setFromDate}
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
                        value={toDate}
                        onChange={setToDate}
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
                <Grid item>
                  <Button variant="outlined" color="secondary" onClick={() => clearFilters()}>
                    Limpar filtros
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
