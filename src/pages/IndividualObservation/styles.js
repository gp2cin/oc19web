import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* height: 100vh; */
  .individual-observation-container {
    margin-top: 85px !important;
    /* overflow: auto !important; */
    background-color: #f8f9fa !important;
    padding: 30px;
    width: 100%;
    align-items: center;
  }
  .content {
    justify-content: center;
    align-items: center;
  }
  .gender {
    backgorund-color: red;
    margin-top: 10px !important;
  }
  .had-pre-existing-diseases {
    margin-top: 10px !important;
  }
  .had-household-contact {
    margin-top: 10px !important;
  }
`;
