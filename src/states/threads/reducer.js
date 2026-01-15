import { actionType } from "./action";

const threadsReducer = (threads = [], action = {}) => {
  switch (action.type) {
    case actionType.RECEIVE_THREADS:
      return action.payload.threads;
    case actionType.CREATE_THREADS:
      return [action.payload.thread, ...threads];
    default:
      return threads;
  }
};

export default threadsReducer;
