import React from 'react';
import Routes from './routes/index';
import { GlobalStyle } from './styles/global';

import { chartjs } from './helpers';
import theme from './theme';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';

import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';

import moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('br');

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw,
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        {/* <div className={'container'}> */}
        <Routes />
        <GlobalStyle />
        {/* </div> */}
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};
export default App;
