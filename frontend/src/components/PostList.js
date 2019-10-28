/** @jsx jsx */
import { jsx } from '@emotion/core';

import PostListItem from './PostListItem';

const PostList = ({ posts }) => {
  // sort posts according to createdAt before rendering
  const sortedPosts = Object.keys(posts)
    .map(slug => posts[slug])
    .sort((a, b) => {
      const d1 = new Date(a.createdAt);
      const d2 = new Date(b.createdAt);
      return d2 - d1;
    });

  return sortedPosts.map(post => <PostListItem key={post.slug} post={post} />);
};

export default PostList;
