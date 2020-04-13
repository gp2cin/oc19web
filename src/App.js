import React from 'react';
import Routes from './routes/index';
import { GlobalStyle } from './styles/global';

const App = () => {
  return (
    <div className={'container'}>
      <Routes />
      <GlobalStyle />
    </div>
  );
};
export default App;
