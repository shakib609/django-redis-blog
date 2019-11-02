import {
  FETCH_POSTS_ERROR,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POST_REQUEST,
  FETCH_POST_ERROR,
  FETCH_POST_SUCCESS,
  FETCH_POST_COMMENTS_REQUEST,
  FETCH_POST_COMMENTS_ERROR,
  FETCH_POST_COMMENTS_SUCCESS
} from '../constants';
import commentsReducer from './commentsReducer';

const defaultState = {
  count: null,
  previous: null,
  next: null,
  results: {},
  loading: false
};

const postsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
    case FETCH_POST_REQUEST:
      return { ...state, loading: true };

    case FETCH_POSTS_SUCCESS:
      const payloadPosts = { ...state.results };
      action.payload.results.map(post => (payloadPosts[post.slug] = post));
      return {
        count: action.payload.count,
        previous: action.payload.previous,
        next: action.payload.next,
        results: payloadPosts,
        loading: false
      };

    case FETCH_POST_SUCCESS:
      const post = action.payload;
      return {
        ...state,
        results: { ...state.results, [post.slug]: post },
        loading: false
      };

    case FETCH_POST_COMMENTS_ERROR:
    case FETCH_POST_COMMENTS_REQUEST:
    case FETCH_POST_COMMENTS_SUCCESS:
      const { postSlug } = action.payload;
      return {
        ...state,
        [postSlug]: { ...post, comments: commentsReducer(state, action) }
      };

    case FETCH_POSTS_ERROR:
    case FETCH_POST_ERROR:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default postsReducer;
