/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Card from 'react-bulma-components/lib/components/card';
import Button from 'react-bulma-components/lib/components/button';
import Content from 'react-bulma-components/lib/components/content';
import {
  Control,
  Field,
  Help,
  Input,
  Label
} from 'react-bulma-components/lib/components/form';

import { login } from '../actions/authActions';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .max(32, 'Maximum 32 characters')
    .matches(/^(\w+)$/, 'Only a-z A-Z 0-9 and _ are allowed')
    .required('This field is Required'),
  password: Yup.string().required('This field is Required')
});

const Login = ({ auth, login }) => {
  const { loading, error: authError } = auth;

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
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={values => login(values.username, values.password)}
            >
              {({ values, errors, touched, handleBlur, handleChange }) => (
                <Form>
                  <Field>
                    <Label>Username</Label>
                    <Control>
                      <Input
                        name="username"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.username}
                        color={
                          errors.username && touched.username ? 'danger' : null
                        }
                      />
                      {errors.username && touched.username && (
                        <Help color="danger">{errors.username}</Help>
                      )}
                    </Control>
                  </Field>
                  <Field>
                    <Label>Password</Label>
                    <Control>
                      <Input
                        type="password"
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        color={
                          errors.password && touched.password ? 'danger' : null
                        }
                      />
                      {errors.password && touched.password && (
                        <Help color="danger">{errors.password}</Help>
                      )}
                      {!!authError && <Help color="danger">{authError}</Help>}
                    </Control>
                  </Field>
                  <Button
                    color="primary"
                    type="submit"
                    disabled={loading}
                    loading={loading}
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
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
