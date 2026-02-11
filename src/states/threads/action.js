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

function voteCommentActionCreator({threadId, commentId, vote, userId}) {
  return {
    type: actionType.VOTE_COMMENT,
    payload: {
      threadId,
      commentId,
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

function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const {authUser} = getState();
    dispatch(showLoading());
    try {
      const vote = await api.upVoteThread(threadId);
      dispatch(
          voteThreadActionCreator({
            threadId,
            vote: {...vote, voteType: 1},
            userId: authUser.id,
          }),
      );
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const {authUser} = getState();
    dispatch(showLoading());
    try {
      const vote = await api.downVoteThread(threadId);
      dispatch(
          voteThreadActionCreator({
            threadId,
            vote: {...vote, voteType: -1},
            userId: authUser.id,
          }),
      );
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralVoteThread(threadId) {
  return async (dispatch, getState) => {
    const {authUser} = getState();
    dispatch(showLoading());
    try {
      const vote = await api.neutralVoteThread(threadId);
      dispatch(
          voteThreadActionCreator({
            threadId,
            vote: {...vote, voteType: 0},
            userId: authUser.id,
          }),
      );
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUpVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const {authUser} = getState();
    dispatch(showLoading());
    try {
      const vote = await api.upVoteComment(threadId, commentId);
      dispatch(
          voteCommentActionCreator({
            threadId,
            commentId,
            vote: {...vote, voteType: 1},
            userId: authUser.id,
          }),
      );
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncDownVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const {authUser} = getState();
    dispatch(showLoading());
    try {
      const vote = await api.downVoteComment(threadId, commentId);
      dispatch(
          voteCommentActionCreator({
            threadId,
            commentId,
            vote: {...vote, voteType: -1},
            userId: authUser.id,
          }),
      );
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const {authUser} = getState();
    dispatch(showLoading());
    try {
      const vote = await api.neutralVoteComment(threadId, commentId);
      dispatch(
          voteCommentActionCreator({
            threadId,
            commentId,
            vote: {...vote, voteType: 0},
            userId: authUser.id,
          }),
      );
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}
//
export {
  asyncAddThread,
  receiveThreadsFromApi,
  actionType,
  addThreadCreator,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
  voteThreadActionCreator,
  voteCommentActionCreator,
};
