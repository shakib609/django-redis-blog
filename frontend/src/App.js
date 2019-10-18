import React from 'react';
import { Router } from '@reach/router';
import Container from 'react-bulma-components/lib/components/container';

import DNavbar from './components/DNavbar';
import Alerts from 'components/Alerts';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <>
      <DNavbar />
      <Container>
        <Router>
          <Home path="/" />
          <Login path="/login" />
          <Register path="/register" />
        </Router>
      </Container>
      <Alerts />
    </>
  );
};

export default App;
