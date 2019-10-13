import React from 'react';
import Container from 'react-bulma-components/lib/components/container';

import DNavbar from './components/DNavbar';

const App = () => {
  return (
    <>
      <DNavbar />
      <Container>
        <h1>Django-Redis-Blog</h1>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </Container>
    </>
  );
};

export default App;
