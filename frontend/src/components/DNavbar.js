import React from 'react';
import { Link } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from 'react-bulma-components/lib/components/navbar';
import Container from 'react-bulma-components/lib/components/container';
import Button from 'react-bulma-components/lib/components/button';

import { logout } from '../actions/authActions';

const DNavbar = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <Navbar
      style={{
        boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Container>
        <Navbar.Brand>
          <Navbar.Item renderAs={Link} to="/">
            <h1>
              <strong>Django-Redis-Blog</strong>
            </h1>
          </Navbar.Item>
          <Navbar.Burger />
        </Navbar.Brand>
        <Navbar.Menu>
          <Navbar.Container position="end">
            <Button.Group>
              {!!auth.accessToken ? (
                <>
                  <Button color="info" renderAs={Link} to="/create">
                    <strong>Create Post</strong>
                  </Button>
                  <Button color="primary" onClick={() => dispatch(logout())}>
                    <strong>Log out</strong>
                  </Button>
                </>
              ) : (
                <>
                  <Button color="primary" renderAs={Link} to="/register">
                    <strong>Sign up</strong>
                  </Button>
                  <Button color="light" renderAs={Link} to="/login">
                    <strong>Log in</strong>
                  </Button>
                </>
              )}
            </Button.Group>
          </Navbar.Container>
        </Navbar.Menu>
      </Container>
    </Navbar>
  );
};

export default DNavbar;
