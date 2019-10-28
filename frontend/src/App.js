import React from 'react';
import { Router } from '@reach/router';
import Container from 'react-bulma-components/lib/components/container';

import Alerts from 'components/Alerts';
import DNavbar from 'components/DNavbar';
import LoadingIndicator from 'components/LoadingIndicator';

// Pages
import Home from './pages/Home';
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const PostDetails = React.lazy(() => import('./pages/PostDetails'));
const CreatePost = React.lazy(() => import('./pages/CreatePost'));

const App = () => {
  return (
    <>
      <DNavbar />
      <Container>
        <React.Suspense fallback={<LoadingIndicator fullPage={true} />}>
          <Router>
            <Home path="/" />
            <Login path="/login" />
            <Register path="/register" />
            <CreatePost path="/create" />
            <PostDetails path="/posts/:slug" />
          </Router>
        </React.Suspense>
      </Container>
      <Alerts />
    </>
  );
};

export default App;
