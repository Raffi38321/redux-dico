import { actionType } from "./action";

const leaderboardsReducer = (leaderBoards = [], action = {}) => {
  switch (action.type) {
    case actionType.RECEIVE_LEADERBOARDS:
      return action.payload.leaderBoards;
    default:
      return leaderBoards;
  }
};

export default leaderboardsReducer;
