/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import PostListItem from './PostListItem';

const PostList = ({ posts }) => {
  return posts.map(post => <PostListItem key={post.id} post={post} />);
};

export default PostList;
