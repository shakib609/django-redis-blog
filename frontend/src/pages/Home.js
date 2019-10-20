import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Columns from 'react-bulma-components/lib/components/columns';

import PostList from 'components/PostList';
import { fetchPosts } from 'actions/postsAction';

const Home = ({ fetchPosts, posts }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage, fetchPosts]);

  return (
    <Columns>
      <Columns.Column size="three-quarters">
        <h3 className="is-size-3 has-text-weight-bold">Recent Posts</h3>
        <PostList posts={posts.results} />
      </Columns.Column>
      <Columns.Column>
        <h5 className="is-size-5 has-text-weight-bold">Tags</h5>
      </Columns.Column>
    </Columns>
  );
};

const mapStateToProps = state => ({ posts: state.posts });

const mapDispatchToProps = dispatch => ({
  fetchPosts: page => dispatch(fetchPosts(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
