/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import Content from 'react-bulma-components/lib/components/content';
import Section from 'react-bulma-components/lib/components/section';

import LoadingIndicator from 'components/LoadingIndicator';
import { fetchPost } from 'actions/postsAction';

const PostDetails = ({ slug, post, isLoading, fetchPost }) => {
  useEffect(() => {
    if (!post) fetchPost();
  }, [slug, post, fetchPost]);

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

const mapStateToProps = ({ posts }, { slug }) => ({
  post: posts.results[slug],
  isLoading: posts.loading
});

const mapDispatchToProps = (dispatch, { slug }) => ({
  fetchPost: () => dispatch(fetchPost(slug))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails);
