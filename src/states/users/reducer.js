import { ActionType } from "./action";

const userReducer = (users = [], action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_USERS:
      return action.payload.users;
    default:
      return users;
  }
};

export default userReducer;
