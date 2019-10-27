/** @jsx jsx */
import { jsx } from '@emotion/core';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import Content from 'react-bulma-components/lib/components/content';
import Section from 'react-bulma-components/lib/components/section';

const PostDetails = ({ post }) => {
  return (
    <Section>
      <Content>
        <h1>{post.title}</h1>
        <ReactMarkdown
          source={post.content}
          className="post-content"
          linkTarget="_blank"
        />
      </Content>
    </Section>
  );
};

const mapStateToProps = ({ posts }, ownProps) => ({
  post: posts.results.find(p => p.slug === ownProps.slug)
});

export default connect(mapStateToProps)(PostDetails);
