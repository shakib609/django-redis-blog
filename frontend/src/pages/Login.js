/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bulma-components/lib/components/card';
import Button from 'react-bulma-components/lib/components/button';
import Content from 'react-bulma-components/lib/components/content';
import {
  Field,
  Control,
  Label,
  Input
} from 'react-bulma-components/lib/components/form';

import { login } from '../actions/authActions';

const Login = ({ auth, login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { loading } = auth;

  return (
    <div>
      <Card
        css={css`
          max-width: 300px;
        `}
      >
        <Card.Content>
          <Content>
            <h3>Log In</h3>
            <Field>
              <Label>Username</Label>
              <Control>
                <Input
                  placeholder="Username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </Control>
            </Field>
            <Field>
              <Label>Password</Label>
              <Control>
                <Input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Control>
            </Field>
            <Button
              color="primary"
              onClick={() => login(username, password)}
              loading={loading}
            >
              Submit
            </Button>
          </Content>
        </Card.Content>
      </Card>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(login(username, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
