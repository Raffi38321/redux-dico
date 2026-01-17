import api from "../../utils/api";
import { hideLoading, showLoading } from "@dimasmds/react-redux-loading-bar";
const actionType = {
  RECEIVE_THREAD_DETAIL: "RECEIVE_THREAD_DETAIL",
  CLEAR_THREAD_DETAIL: "CLEAR_THREAD_DETAIL",
  ADD_COMMENT: "ADD_COMMENT",
  VOTE_THREAD_DETAIL: "VOTE_THREAD_DETAIL",
  VOTE_COMMENT_DETAIL: "VOTE_COMMENT_DETAIL",
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: actionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: actionType.CLEAR_THREAD_DETAIL,
  };
}

function addCommentActionCreator(comment) {
  return {
    type: actionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function voteThreadDetailActionCreator({ vote, userId }) {
  return {
    type: actionType.VOTE_THREAD_DETAIL,
    payload: {
      vote,
      userId,
    },
  };
}

function voteCommentDetailActionCreator({ commentId, vote, userId }) {
  return {
    type: actionType.VOTE_COMMENT_DETAIL,
    payload: {
      commentId,
      vote,
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddComment(threadId, content) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment(threadId, content);
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

// Thread voting async actions for detail page
function asyncUpVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(showLoading());
    try {
      const vote = await api.upVoteThread(threadId);
      dispatch(
        voteThreadDetailActionCreator({
          vote: { ...vote, voteType: 1 },
          userId: authUser.id,
        }),
      );
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncDownVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(showLoading());
    try {
      const vote = await api.downVoteThread(threadId);
      dispatch(
        voteThreadDetailActionCreator({
          vote: { ...vote, voteType: -1 },
          userId: authUser.id,
        }),
      );
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    try {
      const vote = await api.neutralVoteThread(threadId);
      dispatch(
        voteThreadDetailActionCreator({
          vote: { ...vote, voteType: 0 },
          userId: authUser.id,
        }),
      );
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncUpVoteCommentDetail(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    try {
      const vote = await api.upVoteComment(threadId, commentId);
      dispatch(
        voteCommentDetailActionCreator({
          commentId,
          vote: { ...vote, voteType: 1 },
          userId: authUser.id,
        }),
      );
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncDownVoteCommentDetail(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    try {
      const vote = await api.downVoteComment(threadId, commentId);
      dispatch(
        voteCommentDetailActionCreator({
          commentId,
          vote: { ...vote, voteType: -1 },
          userId: authUser.id,
        }),
      );
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncNeutralVoteCommentDetail(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    try {
      const vote = await api.neutralVoteComment(threadId, commentId);
      dispatch(
        voteCommentDetailActionCreator({
          commentId,
          vote: { ...vote, voteType: 0 },
          userId: authUser.id,
        }),
      );
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  actionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncNeutralVoteThreadDetail,
  asyncUpVoteCommentDetail,
  asyncDownVoteCommentDetail,
  asyncNeutralVoteCommentDetail,
};
