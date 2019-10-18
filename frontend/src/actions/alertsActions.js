import { ADD_ALERT, REMOVE_ALERT } from '../constants';

const generateRandomId = () => parseInt((Math.random() * 10000) % 999);

export const addAlert = ({ message, type }) => {
  return {
    type: ADD_ALERT,
    payload: {
      id: generateRandomId(),
      message,
      type
    }
  };
};

export const removeAlert = id => {
  return {
    type: REMOVE_ALERT,
    payload: { id }
  };
};
