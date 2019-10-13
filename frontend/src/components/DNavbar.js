import React, { useState } from 'react';
import { Button, Container, Modal, Navbar } from 'rbx';

const DNavbar = () => {
  const [active, setActive] = useState(false);
  const [formType, setFormType] = useState('login');

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand>
            <Navbar.Item>
              <h1 className="has-text-weight-bold">Django-Redis-Blog</h1>
            </Navbar.Item>
          </Navbar.Brand>
          <Navbar.Menu>
            <Navbar.Segment align="end">
              <Navbar.Item>
                <Button.Group>
                  <Button color="primary">
                    <strong>Sign up</strong>
                  </Button>
                  <Button
                    color="light"
                    onClick={() => {
                      setFormType('login');
                      setActive(true);
                    }}
                  >
                    Log in
                  </Button>
                </Button.Group>
              </Navbar.Item>
            </Navbar.Segment>
          </Navbar.Menu>
        </Container>
      </Navbar>
      <Modal
        active={active}
        onClose={() => setActive(false)}
        closeOnBlur={true}
      >
        <Modal.Background />
        <Modal.Card>
          <Modal.Card.Head>
            <Modal.Card.Title>
              {formType === 'login' ? 'Log in' : 'Register'}
            </Modal.Card.Title>
          </Modal.Card.Head>
          <Modal.Card.Body></Modal.Card.Body>
        </Modal.Card>
      </Modal>
    </>
  );
};

export default DNavbar;
