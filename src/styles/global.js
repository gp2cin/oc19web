import { createGlobalStyle } from 'styled-components';

import 'font-awesome/css/font-awesome.css';

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  outline: 0;
}
@media (min-width: 768px) {
  html {
    font-size: 16px;
  }
}
body, html {
  background: #fff;
  font-family: 'Helvetica Neue', 'Helvetica', Arial, sans-serif;
  text-rendering: optimizeLegibility !important;
  -webkit-font-smoothing: antialiased !important;
  height: 100%;
  width: 100%;
  font-size: 14px;
}
.container {
  max-width: 960px;
}
.homeMap{
  width: 100%;
  height: 400px;
  margin-top: 120px;
  /* max-width: 700px; */
};
.navbar-brand img{
  height: 60px;
}

`;
