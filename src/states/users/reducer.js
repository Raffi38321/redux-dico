import { ActionType } from "./action";

const userReducer = (users = [], action = {}) => {
  switch (action.type) {
    case ActionType.REGISTER_USER:
      return action.type.payload;
    default:
      return users;
  }
};

export default userReducer;
