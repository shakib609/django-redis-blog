/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useSelector } from 'react-redux';
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

import { createPost } from 'actions/postsAction';
import { useThunkDispatch } from 'utils';

const CreatePostSchema = Yup.object().shape({
  title: Yup.string().required(),
  tags: Yup.string(),
  content: Yup.string().required()
});

const CreatePostForm = () => {
  const loading = useSelector(state => state.posts.loading);
  const dispatch = useThunkDispatch();

  return (
    <Formik
      initialValues={{ title: '', content: '', tags: '' }}
      validationSchema={CreatePostSchema}
      onSubmit={values => {
        const tags = values.tags.split(',').map(tag => ({ slug: tag.trim() }));
        dispatch(createPost({ ...values, tags }));
      }}
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
            <Label>Tags</Label>
            <Control>
              <Input
                name="tags"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tags}
                color={errors.tags && touched.tags ? 'danger' : null}
              />
              <Help color="dark">
                Insert tags separated by commas.(Tags should contain lowercase
                letters only)
              </Help>
              {errors.tags && touched.tags && (
                <Help color="danger">{errors.tags}</Help>
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
  );
};

export default CreatePostForm;
