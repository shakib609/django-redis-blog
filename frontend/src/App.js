import React from 'react';
import { Router } from '@reach/router';
import Container from 'react-bulma-components/lib/components/container';

import DNavbar from './components/DNavbar';
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
  return (
    <>
      <DNavbar />
      <Container>
        <Router>
          <Home path="/" />
          <Login path="/login" />
        </Router>
      </Container>
    </>
  );
};

export default App;
