import React from 'react';
import MaterialTable from 'material-table';
import { AddBox, ArrowDownward } from '@material-ui/icons';
import { forwardRef } from 'react';
import { makeStyles } from '@material-ui/styles';

import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  see: forwardRef((props, ref) => <RemoveRedEye {...props} ref={ref} />),
};

const useStyles = makeStyles(() => ({
  rootTitle: {
    padding: '16px 8px',
  },
  title: {},
  subTitle: {},
}));

export default function MaterialTableDemo(props) {
  const { type, data, agent } = props;
  const classes = useStyles();

  const renderColumns = () => {
    const titles = {
      Observador: {
        'Observações Gerais': [
          { title: 'id', field: 'id' },
          { title: 'Nome observador', field: 'observerName' },
          { title: 'Email observador', field: 'observerEmail' },
          { title: 'Bairro', field: 'neigborhood' },
          { title: 'Cidade', field: 'city' },
        ],
        'Observações Individuais': [
          { title: 'id', field: 'id' },
          { title: 'Nome observador', field: 'Nome observador' },
          { title: 'Email observador', field: 'Email observador' },
          { title: 'Bairro', field: 'Bairro' },
        ],
        'Observações em Lote': [
          { title: 'id', field: 'id' },
          { title: 'Nome observador', field: 'Nome observador' },
          { title: 'Email observador', field: 'Email observador' },
          { title: 'Bairro', field: 'Bairro' },
        ],
      },
      Indivíduo: {
        'Auto Casos': [{ title: 'id', field: 'id' }],
        'Observações Gerais': [
          { title: 'id', field: 'id' },
          { title: 'Nome indivíduo', field: 'observerName' },
          { title: 'Email indivíduo', field: 'observerEmail' },
          { title: 'Bairro', field: 'neigborhood' },
          { title: 'Cidade', field: 'city' },
        ],
      },
    };

    return titles[agent][type];
  };

  const renderData = () => {
    return data.map((observation) => {
      const dataCells = {
        Observador: {
          'Observações Gerais': {
            id: observation._id,
            observerName: observation.observer_name,
            observerEmail: observation.observer_email,
            neigborhood: observation.neighborhood_name,
            city: observation.city,
          },
          'Observações Individuais': { id: 1 },
          'Observações em Lote': { id: 1 },
        },
        Indivíduo: {
          'Auto Casos': { id: observation._id },
          'Observações Gerais': {
            id: observation._id,
            observerName: observation.observer_name,
            observerEmail: observation.observer_email,
            neigborhood: observation.neighborhood_name,
            city: observation.city,
          },
        },
      };

      return dataCells[agent][type];
    });
  };

  return (
    <MaterialTable
      localization={{
        body: {
          emptyDataSourceMessage: 'Nenhum registro para exibir',
        },
        header: {
          actions: 'Ações',
        },
        toolbar: {
          searchPlaceholder: 'Pesquisar',
          searchTooltip: 'Pesquisar',
        },
        pagination: {
          labelRowsSelect: 'linhas',
          labelDisplayedRows: '{count} de {from}-{to}',
          firstTooltip: 'Primeira página',
          previousTooltip: 'Página anterior',
          nextTooltip: 'Próxima página',
          lastTooltip: 'Última página',
        },
      }}
      options={{
        pageSize: 20,
        pageSizeOptions: [20],
        paginationType: 'stepped',
      }}
      title={
        <div className={classes.rootTitle}>
          <h2 className={classes.title}>{'Observações - ' + agent}</h2>
          <h5 className={classes.subTitle}>{type}</h5>
        </div>
      }
      icons={tableIcons}
      columns={renderColumns()}
      data={renderData()}
      actions={[
        {
          icon: () => <RemoveRedEye />,
          tooltip: 'Ver observação',
          onClick: (event, rowData) => {},
        },
      ]}
    />
  );
}
