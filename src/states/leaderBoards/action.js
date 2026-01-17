import api from "../../utils/api";

const actionType = {
  RECEIVE_LEADERBOARDS: "RECEIVE_LEADERBOARDS",
};

function receiveLeaderBoardsFromAPi(leaderBoards) {
  return {
    type: actionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderBoards,
    },
  };
}

function asyncSetLeaderBoards() {
  return async (dispatch) => {
    try {
      const leaderboards = await api.getLeaderBoards();
      dispatch(receiveLeaderBoardsFromAPi(leaderboards));
    } catch (error) {
      alert(error.message);
    }
  };
}

export { actionType, asyncSetLeaderBoards, receiveLeaderBoardsFromAPi };
