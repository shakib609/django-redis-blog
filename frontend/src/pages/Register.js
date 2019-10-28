/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Card from 'react-bulma-components/lib/components/card';
import Button from 'react-bulma-components/lib/components/button';
import Content from 'react-bulma-components/lib/components/content';
import Section from 'react-bulma-components/lib/components/section';
import {
  Control,
  Field,
  Help,
  Input,
  Label
} from 'react-bulma-components/lib/components/form';

import { register } from 'actions/authActions';

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .max(32, 'Maximum 32 characters')
    .matches(/^(\w+)$/, 'Only a-z A-Z 0-9 and _ are allowed')
    .required('This field is Required'),
  email: Yup.string()
    .email()
    .required('This field is Required'),
  password: Yup.string().required('This field is Required'),
  firstName: Yup.string(),
  lastName: Yup.string()
});

const Register = ({ auth, register }) => {
  const { loading, error: authError } = auth;

  return (
    <Section>
      <Card
        css={css`
          max-width: 360px;
        `}
      >
        <Card.Content>
          <Content>
            <h3>Sign Up</h3>
            <Formik
              initialValues={{
                username: '',
                email: '',
                password: '',
                firstName: '',
                lastName: ''
              }}
              validationSchema={RegisterSchema}
              onSubmit={values => register(values)}
            >
              {({ values, errors, touched, handleBlur, handleChange }) => (
                <Form>
                  <Field>
                    <Label>Username</Label>
                    <Control>
                      <Input
                        autoFocus
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
                    <Label>E-mail</Label>
                    <Control>
                      <Input
                        name="email"
                        type="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        color={errors.email && touched.email ? 'danger' : null}
                      />
                      {errors.email && touched.email && (
                        <Help color="danger">{errors.email}</Help>
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
                  <Field>
                    <Label>First Name</Label>
                    <Control>
                      <Input
                        name="firstName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        color={
                          errors.firstName && touched.firstName
                            ? 'danger'
                            : null
                        }
                      />
                      {errors.firstName && touched.firstName && (
                        <Help color="danger">{errors.firstName}</Help>
                      )}
                    </Control>
                  </Field>
                  <Field>
                    <Label>Last Name</Label>
                    <Control>
                      <Input
                        name="lastName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastName}
                        color={
                          errors.lastName && touched.lastName ? 'danger' : null
                        }
                      />
                      {errors.lastName && touched.lastName && (
                        <Help color="danger">{errors.lastName}</Help>
                      )}
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
    </Section>
  );
};

const mapStateToProps = state => ({ auth: state.auth });

const mapDispatchToProps = dispatch => ({
  register: user => dispatch(register(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
