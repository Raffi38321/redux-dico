import { ActionType } from "./action";

const userReducer = (user = [], action = {}) => {
  switch (action.type) {
    case ActionType.REGISTER_USER:
      return action.type.payload;
    default:
      return user;
  }
};

export default userReducer;
