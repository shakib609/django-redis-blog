/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import Content from 'react-bulma-components/lib/components/content';
import Section from 'react-bulma-components/lib/components/section';

import { fetchPost } from 'actions/postsAction';
import { useThunkDispatch } from '../utils';
import LoadingIndicator from 'components/LoadingIndicator';

const PostDetails = ({ slug }) => {
  const dispatch = useThunkDispatch();
  const post = useSelector(state => state.posts.results[slug]);
  const isLoading = useSelector(state => state.posts.loading);

  useEffect(() => {
    if (!post) dispatch(fetchPost(slug));
  }, [slug, post, dispatch]);

  return (
    <Section>
      <Content>
        {isLoading || !post ? (
          <LoadingIndicator />
        ) : (
          <Fragment>
            <h1>{post.title}</h1>
            <ReactMarkdown
              source={post.content}
              className="post-content"
              linkTarget="_blank"
            />
          </Fragment>
        )}
      </Content>
    </Section>
  );
};

export default PostDetails;
