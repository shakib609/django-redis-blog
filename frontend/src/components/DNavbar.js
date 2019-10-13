/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from '@reach/router';
import Navbar from 'react-bulma-components/lib/components/navbar';
import Container from 'react-bulma-components/lib/components/container';
import Button from 'react-bulma-components/lib/components/button';

const DNavbar = () => {
  return (
    <Navbar
      css={css`
        box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
        margin-bottom: 1.5rem;
      `}
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
              <Button color="primary">
                <strong>Sign up</strong>
              </Button>
              <Button color="light">
                <strong>Log in</strong>
              </Button>
            </Button.Group>
          </Navbar.Container>
        </Navbar.Menu>
      </Container>
    </Navbar>
  );
};

export default DNavbar;
