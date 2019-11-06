/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bulma-components/lib/components/button';
import {
  Control,
  Field,
  Help,
  Input,
  Textarea,
  Label
} from 'react-bulma-components/lib/components/form';

const CreatePostSchema = Yup.object().shape({
  title: Yup.string().required(),
  content: Yup.string().required()
});

const CreatePostForm = () => {
  return (
    <Formik
      initialValues={{ title: '', content: '' }}
      validationSchema={CreatePostSchema}
      onSubmit={console.log}
    >
      {({ values, errors, touched, handleBlur, handleChange }) => (
        <Form>
          <Field>
            <Label>Title</Label>
            <Control>
              <Input
                name="title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                color={errors.title && touched.title ? 'danger' : null}
              />
              {errors.title && touched.title && (
                <Help color="danger">{errors.title}</Help>
              )}
            </Control>
          </Field>
          <Field>
            <Label>Content</Label>
            <Control>
              <Textarea
                name="content"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.content}
                color={errors.content && touched.content ? 'danger' : null}
              />
              {errors.content && touched.content && (
                <Help color="danger">{errors.content}</Help>
              )}
            </Control>
          </Field>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreatePostForm;
