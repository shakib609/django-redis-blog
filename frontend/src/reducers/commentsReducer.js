import {
  FETCH_POST_COMMENTS_ERROR,
  FETCH_POST_COMMENTS_SUCCESS,
  FETCH_POST_COMMENTS_REQUEST
} from '../constants';

const defaultState = {
  count: null,
  loading: false,
  next: null,
  previous: null,
  results: {}
};

const commentsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_POST_COMMENTS_REQUEST:
      return { ...state, loading: true };

    case FETCH_POST_COMMENTS_SUCCESS:
      const payloadComments = { ...state.results };
      action.payload.results.map(
        comment => (payloadComments[comment.id] = comment)
      );
      return {
        count: action.payload.count,
        loading: false,
        next: action.payload.next,
        previous: action.payload.previous,
        results: payloadComments
      };

    case FETCH_POST_COMMENTS_ERROR:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default commentsReducer;
