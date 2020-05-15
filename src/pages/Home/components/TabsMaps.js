import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import CustomMap from './CustomMap';

import api from '../../../services/api';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={1}>{children}</Box>}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    minHeight: 36,
    height: 36,
  },
  tab: {
    minHeight: 36,
    height: 36,
  },
}));

export default function TabsMaps({ userAddress }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [loadingCity, setLoadingCity] = React.useState(true);
  const [loadingNeigh, setLoadingNeigh] = React.useState(true);
  const [geoJsonNeighborhood, setGeoJsonNeighborhood] = useState({});
  const [geoJsonCity, setGeoJsonCity] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  return (
    <div className={classes.root}>
      {/* <AppBar position="static"> */}
      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" className={classes.tabs}>
        <Tab
          label="Cidade"
          {...a11yProps(0)}
          style={{
            outline: 0,
          }}
          className={classes.tab}
        />
        <Tab
          label="Bairro"
          {...a11yProps(1)}
          style={{
            outline: 0,
          }}
          className={classes.tab}
        />
      </Tabs>
      {/* </AppBar> */}
      <TabPanel value={value} index={0}>
        <CustomMap userLocation={userAddress.position} geoJson={geoJsonCity} loading={loadingCity} />
      </TabPanel>
      <TabPanel value={value} index={1}>
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
