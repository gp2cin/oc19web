import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';

import CustomMap from './CustomMap';

import api from '../../../../services/api';

import Typography from '@material-ui/core/Typography';
import { AppBar } from '@material-ui/core';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
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
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    minHeight: 36,
    height: 36,
  },
  tab: {
    minHeight: 36,
    color: 'black',
    height: 36,
    '&:focus': {
      outline: 0,
    },
  },
}));

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}))(Tooltip);

export default function ScrollableTabsButtonAuto({ userAddress }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [loadingCity, setLoadingCity] = React.useState(true);
  const [loadingNeigh, setLoadingNeigh] = React.useState(true);
  const [geoJsonNeighborhood, setGeoJsonNeighborhood] = useState({});
  const [geoJsonCity, setGeoJsonCity] = useState({});

  useEffect(() => {
    getMapDataCity();
    getMapDataNeigh();
  }, []);

  async function getMapDataCity() {
    const city = await api.get('api/v1/cases/map?mapa=cidade');
    setGeoJsonCity(city.data);

    setLoadingCity(false);
  }

  async function getMapDataNeigh() {
    const neighborhood = await api.get('api/v1/cases/map?mapa=bairro');
    setGeoJsonNeighborhood(neighborhood.data);
    console.log(neighborhood);
    setLoadingNeigh(false);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: 'white' }}>
        <Tabs
          className={classes.tabs}
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <CustomTooltip title="Dados provenientes do Instituto para Redução de Riscos e Desastres de Pernambuco (IRRD).">
            <Tab label="Casos por município" {...a11yProps(0)} className={classes.tab} />
          </CustomTooltip>
          <CustomTooltip title="Dados provenientes da Rede de Observadores OCovid19.">
            <Tab label="Observações por município" {...a11yProps(1)} className={classes.tab} />
          </CustomTooltip>
          {/* <Tab label="Auto casos por município" {...a11yProps(1)} className={classes.tab} /> */}
          <CustomTooltip title="Dados provenientes da Rede de Observadores OCovid19.">
            <Tab label="Observações por bairro" {...a11yProps(2)} className={classes.tab} />
          </CustomTooltip>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <CustomMap userLocation={userAddress.position} geoJson={geoJsonCity} loading={loadingCity} />
        <p> Fonte: IRRD-PE</p>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CustomMap userLocation={userAddress.position} geoJson={geoJsonCity} loading={loadingCity} isObserverCity />
      </TabPanel>
      {/* <TabPanel value={value} index={1}>
        <CustomMap userLocation={userAddress.position} geoJson={geoJsonCity} loading={loadingCity} isObserverCity />
      </TabPanel> */}
      <TabPanel value={value} index={2}>
        <CustomMap
          userLocation={userAddress.position}
          plotType="byNeighborhood"
          geoJson={geoJsonNeighborhood}
          loading={loadingNeigh}
        />
      </TabPanel>

    </div>
  );
}
