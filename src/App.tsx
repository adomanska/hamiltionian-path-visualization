import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, Container, Row, Col} from 'react-bootstrap'
import {VisNetwork} from './vis_network'

const App: React.FC = () => {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col><Button variant="primary">Upload graph</Button></Col>
          <Col><Button variant="primary">Upload solution</Button></Col>
        </Row>
      </Container>
      <VisNetwork/>
    </div>
  );
}

export default App;
