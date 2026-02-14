import api from '../../utils/api';
import {hideLoading, showLoading} from '@dimasmds/react-redux-loading-bar';
const actionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  CREATE_THREADS: 'CREATE_THREADS',
  VOTE_THREAD: 'VOTE_THREAD',
  VOTE_COMMENT: 'VOTE_COMMENT',
};

function receiveThreadsFromApi(threads) {
  return {
    type: actionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadCreator(thread) {
  return {
    type: actionType.CREATE_THREADS,
    payload: {
      thread,
    },
  };
}

function voteThreadActionCreator({threadId, vote, userId}) {
  return {
    type: actionType.VOTE_THREAD,
    payload: {
      threadId,
      vote,
      userId,
    },
  };
}

function asyncAddThread({title, body, category}) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({title, body, category});
      dispatch(addThreadCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncVoteThread(threadId, voteTypes) {
  return async (dispatch, getState) => {
    const {authUser, threads} = getState();
    const userId = authUser.id;
    const thread = threads.find((t) => t.id === threadId);
    const wasUpVoted = thread.upVotesBy.includes(userId);
    const wasDownvoted = thread.downVotesBy.includes(userId);
    dispatch(
        voteThreadActionCreator({
          threadId,
          vote: {voteType: voteTypes},
          userId,
        }),
    );
    try {
      if (voteTypes === 1) await api.upVoteThread(threadId);
      else if (voteTypes === -1) await api.downVoteThread(threadId);
      else await api.neutralVoteThread(threadId);
    } catch (error) {
      let rolBack = 0;
      if (wasUpVoted) rolBack = 1;
      else if (wasDownvoted) rolBack = -1;
      dispatch(
          voteThreadActionCreator({
            threadId,
            vote: {voteType: rolBack},
            userId,
          }),
      );
      alert(error.message);
      console.log(error.message);
    }
  };
}

export {
  asyncAddThread,
  receiveThreadsFromApi,
  actionType,
  addThreadCreator,
  voteThreadActionCreator,
  asyncVoteThread,
};
