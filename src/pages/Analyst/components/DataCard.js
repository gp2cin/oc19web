import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  content: {
    alignItems: 'center',
    display: 'flex',
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
}));

const DataCard = (props) => {
  const { className, type, amount } = props;

  const classes = useStyles();

  const translateType = {
    commons: 'Usuários Comuns',
    observers: 'Observação de observadores',
    generalObservations: 'Observação geral',
    warnings: 'Auto casos',
    observerReports: 'Observação de observadores',
  };

  return (
    <Card className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography className={classes.title} color="inherit" gutterBottom>
              {translateType[type]}
            </Typography>
            <Typography color="inherit" variant="h4">
              {amount}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

DataCard.propTypes = {
  amount: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default DataCard;
