import {actionType} from './action';

const threadsReducer = (threads = [], action = {}) => {
  switch (action.type) {
    case actionType.RECEIVE_THREADS:
      return action.payload.threads;
    case actionType.CREATE_THREADS:
      return [action.payload.thread, ...threads];
    case actionType.VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          const {vote, userId} = action.payload;

          const updatedUpVotesBy = thread.upVotesBy.filter(
              (id) => id !== userId,
          );
          const updatedDownVotesBy = thread.downVotesBy.filter(
              (id) => id !== userId,
          );

          if (vote.voteType === 1) {
            updatedUpVotesBy.push(userId);
          } else if (vote.voteType === -1) {
            updatedDownVotesBy.push(userId);
          }

          return {
            ...thread,
            upVotesBy: updatedUpVotesBy,
            downVotesBy: updatedDownVotesBy,
          };
        }
        return thread;
      });
    case actionType.VOTE_COMMENT:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          const {commentId, vote, userId} = action.payload;

          const updatedComments = thread.comments?.map((comment) => {
            if (comment.id === commentId) {
              const updatedUpVotesBy = comment.upVotesBy.filter(
                  (id) => id !== userId,
              );
              const updatedDownVotesBy = comment.downVotesBy.filter(
                  (id) => id !== userId,
              );

              if (vote.voteType === 1) {
                updatedUpVotesBy.push(userId);
              } else if (vote.voteType === -1) {
                updatedDownVotesBy.push(userId);
              }

              return {
                ...comment,
                upVotesBy: updatedUpVotesBy,
                downVotesBy: updatedDownVotesBy,
              };
            }
            return comment;
          });

          return {
            ...thread,
            comments: updatedComments,
          };
        }
        return thread;
      });
    default:
      return threads;
  }
};

export default threadsReducer;
