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
  padding: 0px 5px;
  font-size: 14px;
}
.container {
  max-width: 960px;
  width: 20;

}
.homeMap{
  width: 100%;
  height: 500px;
  margin-top: 10px
  /* max-width: 700px; */
};
.my-div-icon{
  background-color: white; 
  justify-content: center;
  align-items: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  border-radius: 10%;
  padding: 5px;
  margin-left: 0px !important;
  margin-top: 0px !important;

  width: auto !important;
  height: auto !important;
  min-width: 50px;
  font-size: 9px;
  text-align: center
}

.amountIcon{
  width: auto !important;
  height: auto !important;
  background-color: white; 
  justify-content: center;
  align-items: center;
  border-radius: 10%;
  padding: 5px;
  
}

.erase-default{
  display: flex
}

.navbar-brand img{
  height: 60px;
}

`;
