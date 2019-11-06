/** @jsx jsx */
import { jsx } from '@emotion/core';
import Content from 'react-bulma-components/lib/components/content';
import Section from 'react-bulma-components/lib/components/section';

import CreatePostForm from 'components/CreatePostForm';

const CreatePost = () => {
  return (
    <Section>
      <Content>
        <h3>Create Post</h3>
        <CreatePostForm />
      </Content>
    </Section>
  );
};

export default CreatePost;
