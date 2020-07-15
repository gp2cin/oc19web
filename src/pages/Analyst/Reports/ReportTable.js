import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

import mockData from './data';

const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 800,
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
  },

  actions: {
    justifyContent: 'flex-end',
  },
}));

const ReportTable = (props) => {
  const { className, type, data, agent, ...rest } = props;

  const classes = useStyles();

  const [orders] = useState(mockData);

  const renderTitles = () => {
    const titles = {
      Observador: {
        'Observações Gerais': ['id', 'Nome observador', 'Email observador', 'Bairro'],
        'Observações individuais': ['id'],
        'Observações em lote': ['id'],
      },
      Indivíduo: { 'Auto-casos': ['id'], 'Observações Gerais': ['id'] },
    };

    return titles[agent][type].map((title) => {
      return <TableCell> {title} </TableCell>;
    });
  };

  const renderInformation = (observation) => {
    const titles = {
      Observador: {
        'Observações Gerais': [
          observation._id,
          observation.observer_name,
          observation.observer_email,
          observation.neighborhood_name,
        ],
        'Observações individuais': ['id'],
        'Observações em lote': ['id'],
      },
      Indivíduo: { 'Auto-casos': ['id'], 'Observações Gerais': ['id'] },
    };

    return (
      <TableRow hover key={observation.id}>
        {titles[agent][type].map((info) => {
          return <TableCell>{info}</TableCell>;
        })}
      </TableRow>
    );
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title={'Observações - ' + agent} subheader={type} />
      <Divider />
      <CardContent style={{ padding: 0 }} className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>{renderTitles()}</TableRow>
              </TableHead>
              <TableBody>{data.map((observation) => renderInformation(observation))}</TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
    </Card>
  );
};

ReportTable.propTypes = {
  className: PropTypes.string,
};

export default ReportTable;
