import {
  FETCH_POSTS_ERROR,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS
} from '../constants';

const defaultState = {
  count: null,
  previous: null,
  next: null,
  results: [],
  loading: false
};

const postsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_POSTS_SUCCESS:
      return {
        count: action.payload.count,
        previous: action.payload.previous,
        next: action.payload.next,
        results: [...state.results, ...action.payload.results],
        loading: false
      };
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default postsReducer;
