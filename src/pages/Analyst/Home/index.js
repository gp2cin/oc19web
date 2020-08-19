import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import DataCard from '../components/DataCard';
import { useEffect, useState } from 'react';
import api from '../../../services/api';

const useStyles = makeStyles(() => ({
  root: {},
}));

const Dashboard = () => {
  const classes = useStyles();
  const [data, setData] = useState({});

  useEffect(() => {
    getHomeData();
  }, []);

  const getHomeData = async () => {
    try {
      const response = await api.get('api/v1/dashboard/statistics');

      const { commons, generalObservations, observerReports, observers, warnings } = response.data;
      setData({
        commons,
        generalObservations,
        observerReports,
        observers,
        warnings,
      });
    } catch (error) {
      setData({
        commons: 0,
        generalObservations: 0,
        observerReports: 0,
        observers: 0,
        warnings: 0,
      });
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        {Object.keys(data).map((type) => {
          return (
            <Grid item xs={2}>
              <DataCard type={type} amount={data[type]} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Dashboard;
