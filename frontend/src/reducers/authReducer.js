import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_ERROR,
  REGISTER_SUCCESS
} from '../constants';

const defaultState = {
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGOUT:
      return { ...defaultState };

    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return { ...state, loading: true };

    case LOGIN_SUCCESS:
      const { accessToken, refreshToken } = action.payload;
      return {
        ...state,
        accessToken,
        refreshToken,
        loading: false
      };

    case REGISTER_SUCCESS:
      return { ...state, loading: false };

    case LOGIN_ERROR:
    case REGISTER_ERROR:
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
