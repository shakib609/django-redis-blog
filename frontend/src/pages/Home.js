/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bulma-components/lib/components/button';
import Columns from 'react-bulma-components/lib/components/columns';
import Section from 'react-bulma-components/lib/components/section';
import Loader from 'react-bulma-components/lib/components/loader';

import PostList from 'components/PostList';
import TagList from 'components/TagList';
import { fetchPosts } from 'actions/postsAction';
import { fetchTags } from 'actions/tagsActions';
import LoadingIndicator from 'components/LoadingIndicator';

class Home extends Component {
  componentDidMount() {
    const { fetchPosts, fetchTags, posts, tags } = this.props;
    if (posts.results.length === 0) fetchPosts(1);
    if (tags.results.length === 0) fetchTags();
  }

  render() {
    const { fetchPosts, posts, tags } = this.props;
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
            {posts.loading && posts.length === 0 ? (
              <LoadingIndicator />
            ) : (
              <Fragment>
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
  }
}

const mapStateToProps = state => ({ posts: state.posts, tags: state.tags });

const mapDispatchToProps = dispatch => ({
  fetchPosts: page => dispatch(fetchPosts(page)),
  fetchTags: () => dispatch(fetchTags(1))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
