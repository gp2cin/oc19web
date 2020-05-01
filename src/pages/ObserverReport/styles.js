import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* height: 100vh; */
  .observer-report-container {
    margin-top: 85px !important;
    /* overflow: auto !important; */
    background-color: #f8f9fa !important;
    padding: 30px;
  }
  .first-inputs {
    dislplay: flex;
    justify-content: space-between;
  }
  .seccond-inputs {
    dislplay: flex;
    justify-content: space-between;
  }
  .content {
    justify-content: center;
    align-items: center;
  }
  @media only screen and (max-width: 768px) {
    .observer-report-container {
      padding: 0px;
    }
    .content {
      margin: 0 auto;
    }
    [class*="col-"] {
      width: 100%;
    }
    .info-source, .info-source-link, .name, .email, .city-select, .neighborhood, .age, .number-of-cases, .comments {
      padding: 0px !important;
    }
    .content p {
      padding-top: 10px;
    }
  }
`;
