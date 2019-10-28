import {
  FETCH_TAGS_ERROR,
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS
} from '../constants';

const defaultState = {
  count: null,
  previous: null,
  next: null,
  results: {},
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
      const payloadTags = { ...state.results };
      console.log(action.payload.results);
      action.payload.results.map(tag => {
        payloadTags[tag.slug] = tag;
      });
      console.log(payloadTags);
      return {
        count: action.payload.count,
        previous: action.payload.previous,
        next: action.payload.next,
        results: payloadTags,
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
