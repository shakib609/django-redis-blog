/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bulma-components/lib/components/button';
import Columns from 'react-bulma-components/lib/components/columns';
import Section from 'react-bulma-components/lib/components/section';
import Loader from 'react-bulma-components/lib/components/loader';

import PostList from 'components/PostList';
import { fetchPosts } from 'actions/postsAction';

const Home = ({ fetchPosts, posts }) => {
  useEffect(() => {
    if (posts.next === null && posts.previous === null) fetchPosts(1);
  }, [posts.next, posts.previous, fetchPosts]);

  const { next } = posts;
  let pageNum = null;

  if (next !== null) {
    const url = new URL(next);
    pageNum = url.searchParams.get('page');
  }

  return (
    <Section>
      <Columns>
        <Columns.Column size="three-quarters">
          <h3 className="is-size-3 has-text-weight-bold">Recent Posts</h3>
          <PostList posts={posts.results} />
          {next !== null && (
            <p className="has-text-centered">
              <Button
                css={css`
                  margin-top: 1.5rem;
                `}
                onClick={() => fetchPosts(pageNum)}
              >
                {posts.loading ? (
                  <Loader
                    css={css`
                      border-color: #00c4a7;
                      border-top-color: transparent;
                      border-right-color: transparent;
                    `}
                  />
                ) : (
                  'Load More'
                )}
              </Button>
            </p>
          )}
        </Columns.Column>
        <Columns.Column>
          <h5 className="is-size-5 has-text-weight-bold">Tags</h5>
        </Columns.Column>
      </Columns>
    </Section>
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
