import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from '../constants';

const defaultState = {
  accessToken: null,
  refreshToken: null,
  loading: false,
  errors: null
};

function authReducer(state = defaultState, action) {
  switch (action.type) {
    case LOGOUT:
      return { ...defaultState };
    case LOGIN:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        loading: false
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors
      };
    default:
      return state;
  }
}

export default authReducer;
