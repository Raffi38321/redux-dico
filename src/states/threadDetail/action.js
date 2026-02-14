import api from '../../utils/api';
import {hideLoading, showLoading} from '@dimasmds/react-redux-loading-bar';
const actionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  VOTE_THREAD_DETAIL: 'VOTE_THREAD_DETAIL',
  VOTE_COMMENT_DETAIL: 'VOTE_COMMENT_DETAIL',
};
function receiveThreadDetailActionCreator(threadDetail) {
  return {type: actionType.RECEIVE_THREAD_DETAIL, payload: {threadDetail}};
}
function clearThreadDetailActionCreator() {
  return {type: actionType.CLEAR_THREAD_DETAIL};
}
function addCommentActionCreator(comment) {
  return {type: actionType.ADD_COMMENT, payload: {comment}};
}
function voteThreadDetailActionCreator({vote, userId}) {
  return {type: actionType.VOTE_THREAD_DETAIL, payload: {vote, userId}};
}
function voteCommentDetailActionCreator({commentId, vote, userId}) {
  return {
    type: actionType.VOTE_COMMENT_DETAIL,
    payload: {commentId, vote, userId},
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

function asyncVoteThreadDetail(threadId, voteTypes) {
  return async (dispatch, getState) => {
    const {authUser, threadDetail} = getState();
    const userId = authUser.id;
    const wasUpVoted = threadDetail.upVotesBy.includes(userId);
    const wasDownvoted = threadDetail.downVotesBy.includes(userId);
    dispatch(
        voteThreadDetailActionCreator({
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
          voteThreadDetailActionCreator({
            vote: {voteType: rolBack},
            userId,
          }),
      );
      alert(error.message);
      console.log(error.message);
    }
  };
}

function asyncVoteCommentDetail(threadId, commentId, voteTypes) {
  return async (dispatch, getState) => {
    const {authUser, threadDetail} = getState();
    const userId = authUser.id;
    const comment = threadDetail.comments.find((c) => c.id === commentId);
    const wasUpvoted = comment.upVotesBy.includes(userId);
    const wasDownvoted = comment.downVotesBy.includes(userId);
    dispatch(
        voteCommentDetailActionCreator({
          commentId,
          vote: {voteType: voteTypes},
          userId,
        }),
    );
    try {
      if (voteTypes === 1) await api.upVoteComment(threadId, commentId);
      else if (voteTypes === -1) await api.downVoteComment(threadId, commentId);
      else await api.neutralVoteComment(threadId, commentId);
    } catch (error) {
      let rolBack = 0;
      if (wasUpvoted) rolBack = 1;
      else if (wasDownvoted) rolBack = -1;
      dispatch(
          voteCommentDetailActionCreator({
            commentId,
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
  actionType,
  asyncVoteThreadDetail,
  asyncVoteCommentDetail,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncAddComment,
};
