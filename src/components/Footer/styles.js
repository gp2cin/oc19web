import styled from 'styled-components';

export const FooterMain = styled.footer`
  height: 60px;
  display: block;
  top: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  outline: 0;
  .footer-group {
    padding-bottom: 20px;
  }
  div {
    background-color: #fff;
  }
  * {
    box-sizing: border-box;
  }
  * ::before {
    box-sizing: border-box;
  }
  .pb-5,
  .py-5 {
    padding-bottom: 3rem !important;
  }
  .pt-5,
  .py-5 {
    padding-top: 3rem !important;
  }

  .container {
    max-width: 960px;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }
  .logo-footer {
    height: 60px;
  }
  .row {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
  }
`;
