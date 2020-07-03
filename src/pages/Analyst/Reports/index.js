import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { Select, Paper, Grid, Typography, Button } from '@material-ui/core';

import MenuItem from '@material-ui/core/MenuItem';
import ReportTable from './ReportTable';

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
  const classes = useStyles();

  const observerTypes = ['Observações Gerais', 'Observações individuais', 'Observações em lote'];
  const userTypes = ['Auto-casos', 'Observações Gerais'];

  const [value, setValue] = React.useState(0);
  const [observerType, setObserverType] = React.useState(0);
  const [secondBar, setSecondBar] = React.useState(observerTypes);

  const handleChange = (e, newValue) => {
    setValue(e.target.value);
    setObserverType(0);
    setSecondBar(newValue === 0 ? observerTypes : userTypes);
  };

  const changeObserverType = (e) => {
    setObserverType(e.target.value);
  };

  return (
    <div className={classes.root}>
      {/* <AppBar position="static" color="default"> */}
      <Grid container spacing={2} direction="column">
        <Grid item>
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
                      {['Observador', 'Indivíduo'].map((name, index) => {
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
                <Button variant="outlined">Buscar</Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item>
          <ReportTable />
        </Grid>
      </Grid>

      {/* <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          {['Observador', 'Usuário'].map((name) => {
            return <Tab label={name} />;
          })}
        </Tabs>
      </AppBar>
      <AppBar position="static" color="default" style={{ marginTop: 8 }}>
        <Tabs value={observerType} onChange={changeObserverType} aria-label="simple tabs example">
          {secondBar.map((name) => {
            return <Tab label={name} />;
          })}
        </Tabs> */}
      {/* </AppBar> */}
      {/* <TabPanel value={observerType} index={0}>
        <Card>
          <CardHeader title="nsei" />
        </Card>
      </TabPanel> */}
    </div>
  );
}
