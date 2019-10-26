/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from '@reach/router';
import Card from 'react-bulma-components/lib/components/card';
import Content from 'react-bulma-components/lib/components/content';

const PostListItem = ({ post }) => {
  return (
    <Card
      css={css`
        margin-top: 0.8rem;
        transition: all 0.3s ease-in-out;
        :hover {
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
        }
      `}
    >
      <Card.Content>
        <Content
          css={css`
            min-height: 120px;
            h4 {
              margin-bottom: 5px;
            }
          `}
        >
          <Link to={`/posts/${post.slug}`}>
            <h4>{post.title}</h4>
          </Link>
          <small>{post.author}</small>
          <p>{post.content.substring(0, 350)}...</p>
        </Content>
      </Card.Content>
    </Card>
  );
};

export default PostListItem;
