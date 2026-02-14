import { useDispatch, useSelector } from "react-redux";
import { asyncVoteCommentDetail } from "../states/threadDetail/action";
import { HiOutlineThumbDown, HiOutlineThumbUp } from "react-icons/hi";
import postedAt from "../utils/dateFormat.js";

function CommentCard({ comment, threadId }) {
  const dispatch = useDispatch();
  const authUser = useSelector((s) => s.authUser);

  const isUpVoted = comment.upVotesBy.includes(authUser?.id);
  const isDownVoted = comment.downVotesBy.includes(authUser?.id);

  const onUpVote = () => {
    if (isUpVoted) {
      dispatch(asyncVoteCommentDetail(threadId, comment.id, 0));
    } else {
      dispatch(asyncVoteCommentDetail(threadId, comment.id, 1));
    }
  };

  const onDownVote = () => {
    if (isDownVoted) {
      dispatch(asyncVoteCommentDetail(threadId, comment.id, 0));
    } else {
      dispatch(asyncVoteCommentDetail(threadId, comment.id, -1));
    }
  };

  return (
    <div className="bg-white border-4 border-black shadow-[6px_6px_0_0_#000] p-5 font-mono">
      <div className="flex items-start gap-4">
        <img
          src={comment.owner.avatar}
          alt={comment.owner.name}
          className="w-12 h-12 border-4 border-black object-cover"
        />

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="font-extrabold text-lg">{comment.owner.name}</h4>
            <span className="text-sm bg-yellow-300 border-2 border-black px-2">
              {postedAt(comment.createdAt)}
            </span>
          </div>

          <p className="mb-4">{comment.content}</p>

          <div className="flex items-center gap-3">
            <button
              onClick={onUpVote}
              className={`
                flex items-center gap-2 px-3 py-1
                border-4 border-black font-bold
                shadow-[3px_3px_0_0_#000]
                transition
                ${isUpVoted ? "bg-red-600" : "bg-white hover:bg-green-200"}
              `}
            >
              <HiOutlineThumbUp className="text-lg" />{" "}
              {comment.upVotesBy.length}
            </button>

            <button
              onClick={onDownVote}
              className={`
                flex items-center gap-2 px-3 py-1
                border-4 border-black font-bold
                shadow-[3px_3px_0_0_#000]
                transition
                ${isDownVoted ? "bg-red-600" : "bg-white hover:bg-red-200"}
              `}
            >
              <HiOutlineThumbDown className="text-lg" />{" "}
              {comment.downVotesBy.length}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
