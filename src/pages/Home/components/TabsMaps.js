import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import CustomMap from './CustomMap';

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <CustomMap userLocation={userAddress.position} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CustomMap userLocation={userAddress.position} plotType="byNeighborhood" />
      </TabPanel>
    </div>
  );
}
