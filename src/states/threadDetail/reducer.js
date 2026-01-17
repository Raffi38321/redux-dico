import { actionType } from "./action";

const threadDetailReducer = (threadDetail = null, action = {}) => {
  switch (action.type) {
    case actionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case actionType.CLEAR_THREAD_DETAIL:
      return null;
    case actionType.ADD_COMMENT:
      return {
        ...threadDetail,
        comments: [action.payload.comment, ...threadDetail.comments],
      };
    case actionType.VOTE_THREAD_DETAIL: {
      const { vote, userId } = action.payload;

      // Remove existing vote from this user if any
      const updatedUpVotesBy = threadDetail.upVotesBy.filter(
        (id) => id !== userId,
      );
      const updatedDownVotesBy = threadDetail.downVotesBy.filter(
        (id) => id !== userId,
      );

      // Add vote based on voteType
      if (vote.voteType === 1) {
        updatedUpVotesBy.push(userId);
      } else if (vote.voteType === -1) {
        updatedDownVotesBy.push(userId);
      }
      // voteType 0 means neutral, so we just remove from both arrays (already done above)

      return {
        ...threadDetail,
        upVotesBy: updatedUpVotesBy,
        downVotesBy: updatedDownVotesBy,
      };
    }
    case actionType.VOTE_COMMENT_DETAIL: {
      const {
        commentId,
        vote: commentVote,
        userId: commentUserId,
      } = action.payload;

      const updatedComments = threadDetail.comments.map((comment) => {
        if (comment.id === commentId) {
          const updatedCommentUpVotesBy = comment.upVotesBy.filter(
            (id) => id !== commentUserId,
          );
          const updatedCommentDownVotesBy = comment.downVotesBy.filter(
            (id) => id !== commentUserId,
          );

          if (commentVote.voteType === 1) {
            updatedCommentUpVotesBy.push(commentUserId);
          } else if (commentVote.voteType === -1) {
            updatedCommentDownVotesBy.push(commentUserId);
          }

          return {
            ...comment,
            upVotesBy: updatedCommentUpVotesBy,
            downVotesBy: updatedCommentDownVotesBy,
          };
        }
        return comment;
      });

      return {
        ...threadDetail,
        comments: updatedComments,
      };
    }
    default:
      return threadDetail;
  }
};

export default threadDetailReducer;
