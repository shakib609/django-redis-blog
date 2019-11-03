/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bulma-components/lib/components/button';
import Columns from 'react-bulma-components/lib/components/columns';
import Section from 'react-bulma-components/lib/components/section';
import Loader from 'react-bulma-components/lib/components/loader';

import PostList from 'components/PostList';
import TagList from 'components/TagList';
import { useThunkDispatch } from 'utils';
import { fetchPosts } from 'actions/postsAction';
import { fetchTags } from 'actions/tagsActions';
import LoadingIndicator from 'components/LoadingIndicator';

const Home = () => {
  const posts = useSelector(state => state.posts);
  const tags = useSelector(state => state.tags);
  const dispatch = useThunkDispatch();

  useEffect(() => {
    if (posts.count === null && tags.count === null) {
      dispatch(fetchPosts(1));
      dispatch(fetchTags(1));
    }
  }, [posts.count, tags.count, dispatch]);

  const postsNext = posts.next;
  let pageNum = null;

  if (postsNext !== null) {
    const url = new URL(postsNext);
    pageNum = url.searchParams.get('page');
  }

  return (
    <Section>
      <Columns>
        <Columns.Column size="three-quarters">
          <h3 className="is-size-3 has-text-weight-bold">Recent Posts</h3>
          {posts.loading && posts.length === 0 ? (
            <LoadingIndicator />
          ) : (
            <Fragment>
              <PostList posts={posts.results} />
              {postsNext !== null && (
                <p className="has-text-centered">
                  <Button
                    css={css`
                      margin-top: 1.5rem;
                    `}
                    onClick={() => dispatch(fetchPosts(pageNum))}
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
            </Fragment>
          )}
        </Columns.Column>
        <Columns.Column>
          {tags.loading ? (
            <Fragment>
              <h4 className="has-text-weight-bold">Tags</h4>
              <LoadingIndicator />
            </Fragment>
          ) : (
            <TagList tags={tags.results} />
          )}
        </Columns.Column>
      </Columns>
    </Section>
  );
};

export default Home;
