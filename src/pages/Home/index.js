import React, { Component } from 'react';

import api from '../../services/api';
import { Form, Container } from './styles';

class Home extends Component {
  state = {
    warnings: [],
  };
  componentDidMount() {}
  render() {
    return (
      <Container>
        <div>
          <h1>Mapa</h1>
        </div>
      </Container>
    );
  }
}
export default Home;
