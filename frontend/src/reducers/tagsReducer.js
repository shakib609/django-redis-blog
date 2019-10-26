import {
  FETCH_TAGS_ERROR,
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS
} from '../constants';

const defaultState = {
  count: null,
  previous: null,
  next: null,
  results: [],
  loading: false
};

const tagsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_TAGS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_TAGS_SUCCESS:
      return {
        count: action.payload.count,
        previous: action.payload.previous,
        next: action.payload.next,
        results: [...state.results, ...action.payload.results],
        loading: false
      };
    case FETCH_TAGS_ERROR:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default tagsReducer;
