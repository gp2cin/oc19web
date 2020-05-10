import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: center;
  height: 100vh;
  .report-home,
  .report-item,
  .report-title,
  .box-official {
    padding-top: 30px;
  }
  .report-ball {
    width: 140px;
    height: 140px;
    background-color: #f00;
  }
`;

export const Map = styled.form`
  width: 600px;
  background: #fff;
  /* padding: 20px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
`;
