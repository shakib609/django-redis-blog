import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  USER_DETAILS_ERROR,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS
} from '../constants';

const defaultState = {
  accessToken: null,
  refreshToken: null,
  loading: false,
  userDetails: {
    username: '',
    firstName: '',
    lastName: ''
  },
  error: null
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGOUT:
      return { ...defaultState };

    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };

    case LOGIN_SUCCESS:
      const { accessToken, refreshToken } = action.payload;
      return {
        ...state,
        accessToken,
        refreshToken,
        error: null,
        loading: false
      };

    case REGISTER_SUCCESS:
      return { ...state, error: null, loading: false };

    case USER_DETAILS_SUCCESS:
      return { ...state, userDetails: action.payload };

    case LOGIN_ERROR:
    case REGISTER_ERROR:
    case USER_DETAILS_ERROR:
      const { error } = action.payload;
      return {
        ...state,
        error,
        loading: false
      };

    default:
      return state;
  }
};

export default authReducer;
