import { actionType } from "./action";

const threadsReducer = (threads = [], action = {}) => {
  switch (action.type) {
    case actionType.RECEIVE_THREADS:
      return action.payload.threads;
    case actionType.CREATE_THREADS:
      return [action.payload.thread, ...threads];
    case actionType.VOTE_THREAD:
      return threads.map((thread) => {
        console.log("reducer jalan");
        if (thread.id === action.payload.threadId) {
          const { vote, userId } = action.payload;

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

    default:
      return threads;
  }
};

export default threadsReducer;
