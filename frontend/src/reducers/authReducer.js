import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from '../constants';

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
    case LOGIN:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      const { accessToken, refreshToken } = action.payload;
      return {
        ...state,
        accessToken,
        refreshToken,
        loading: false
      };
    case LOGIN_ERROR:
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
