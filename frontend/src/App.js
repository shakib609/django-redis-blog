import React from 'react';
import { Router } from '@reach/router';
import Container from 'react-bulma-components/lib/components/container';

import DNavbar from './components/DNavbar';
import Home from './pages/Home';

const App = () => {
  return (
    <>
      <DNavbar />
      <Container>
        <Router>
          <Home path="/" />
        </Router>
      </Container>
    </>
  );
};

export default App;
