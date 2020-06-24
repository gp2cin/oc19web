import React from 'react';
import Routes from './routes/index';
import { GlobalStyle } from './styles/global';

import { chartjs } from './helpers';
import theme from './theme';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';

import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw,
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* <div className={'container'}> */}
      <Routes />
      <GlobalStyle />
      {/* </div> */}
    </ThemeProvider>
  );
};
export default App;
