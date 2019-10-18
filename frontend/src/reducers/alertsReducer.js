import { ADD_ALERT, REMOVE_ALERT } from '../constants';

const alertsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ALERT:
      return [action.payload, ...state];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload.id);
    default:
      return state;
  }
};

export default alertsReducer;
