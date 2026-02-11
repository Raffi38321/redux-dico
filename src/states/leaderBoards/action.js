import api from '../../utils/api';
import {hideLoading, showLoading} from '@dimasmds/react-redux-loading-bar';
const actionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
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
    dispatch(showLoading());
    try {
      const leaderboards = await api.getLeaderBoards();
      dispatch(receiveLeaderBoardsFromAPi(leaderboards));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export {actionType, asyncSetLeaderBoards, receiveLeaderBoardsFromAPi};
