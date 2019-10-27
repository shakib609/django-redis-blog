/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import Content from 'react-bulma-components/lib/components/content';
import Section from 'react-bulma-components/lib/components/section';

import LoadingIndicator from 'components/LoadingIndicator';
import client from 'client';

const PostDetails = ({ storePost, slug }) => {
  const [isLoading, setIsLoading] = useState(!storePost);
  const [post, setPost] = useState(storePost);

  // Fetch Post if not in store.
  // TODO: Improve this
  useEffect(() => {
    if (!post) {
      client
        .get(`/posts/${slug}/`)
        .then(response => {
          setPost(response.data);
          setIsLoading(false);
        })
        .catch(e => console.error('Something Went Wrong!'));
    }
  }, [post, slug]);

  return (
    <Section>
      <Content>
        {isLoading ? (
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

const mapStateToProps = ({ posts }, ownProps) => ({
  storePost: posts.results.find(p => p.slug === ownProps.slug)
});

export default connect(mapStateToProps)(PostDetails);
