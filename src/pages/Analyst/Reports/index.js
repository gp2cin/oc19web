import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { Select, Paper, Grid, Typography, Button, CircularProgress } from '@material-ui/core';

import MenuItem from '@material-ui/core/MenuItem';
import ReportTable from './ReportTable';
import api from '../../../services/api';

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

  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    getData();
  }, []);

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
        const response = await api.get('api/v1/general-observations');

        setData(response.data.generalObservations);
      }
    }
    setLoading(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper style={{ padding: 15 }}>
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
              <Button variant="outlined" onClick={() => handleSearch()}>
                Buscar
              </Button>
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
          <ReportTable agent={actualConfig.agent} type={actualConfig.type} data={data} />
        )}
      </Grid>
    </Grid>
  );
}
