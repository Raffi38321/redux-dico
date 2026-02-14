import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncReceiveThreadDetail,
  asyncVoteThreadDetail,
} from "../states/threadDetail/action";
import CommentCard from "../components/CommentCard";
import CommentInput from "../components/CommentInput";
import postedAt from "../utils/dateFormat";
import { HiOutlineThumbDown, HiOutlineThumbUp } from "react-icons/hi";

function DetailedThreadPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const threadDetail = useSelector((s) => s.threadDetail);
  const authUser = useSelector((s) => s.authUser);
  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  if (!threadDetail) {
    return null;
  }

  const isUpVoted = threadDetail.upVotesBy.includes(authUser?.id);
  const isDownVoted = threadDetail.downVotesBy.includes(authUser?.id);

  const onUpVote = () => {
    if (isUpVoted) {
      dispatch(asyncVoteThreadDetail(id, 0));
      console.log(threadDetail);
    } else {
      dispatch(asyncVoteThreadDetail(id, 1));
    }
  };

  const onDownVote = () => {
    if (isDownVoted) {
      dispatch(asyncVoteThreadDetail(id, 0));
    } else {
      dispatch(asyncVoteThreadDetail(id, -1));
    }
  };

  return (
    <div className="min-h-screen font-mono">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-block mb-6 px-4 py-2 bg-white border-4 border-black shadow-[4px_4px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1 transition"
        >
          ← BALIK
        </Link>

        <div className="bg-white border-4 border-black shadow-[8px_8px_0_0_#000] p-6 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <img
                src={threadDetail.owner.avatar}
                alt={threadDetail.owner.name}
                className="w-14 h-14 border-4 border-black object-cover"
              />
              <div>
                <h3 className="font-bold text-lg">{threadDetail.owner.name}</h3>
                <p className="text-sm">{postedAt(threadDetail.createdAt)}</p>
              </div>
            </div>

            <span className="px-3 py-1 bg-yellow-300 border-4 border-black text-sm font-bold">
              #{threadDetail.category}
            </span>
          </div>

          <h1 className="text-3xl font-extrabold mb-4">{threadDetail.title}</h1>

          <div
            className="prose max-w-none mb-6"
            dangerouslySetInnerHTML={{ __html: threadDetail.body }}
          />

          <div className="flex items-center gap-4 pt-4 border-t-4 border-black">
            <button
              onClick={onUpVote}
              className={`flex items-center gap-2 px-4 py-2 border-4 border-black font-bold shadow-[4px_4px_0_0_#000] transition
                ${isUpVoted ? "bg-red-600" : "bg-white hover:bg-green-200"}
              `}
            >
              <HiOutlineThumbUp className="text-lg" />{" "}
              {threadDetail.upVotesBy.length}
            </button>

            <button
              onClick={onDownVote}
              className={`flex items-center gap-2 px-4 py-2 border-4 border-black font-bold shadow-[4px_4px_0_0_#000] transition
                ${isDownVoted ? "bg-red-600" : "bg-white hover:bg-red-200"}
              `}
            >
              <HiOutlineThumbDown className="text-lg" />{" "}
              {threadDetail.downVotesBy.length}
            </button>

            <span className="font-bold">
              {threadDetail.comments.length} COMMENTS
            </span>
          </div>
        </div>

        {authUser && (
          <div className="mb-8">
            <CommentInput threadId={id} />
          </div>
        )}

        <div>
          <h2 className="text-2xl font-extrabold mb-4">
            COMMENTS ({threadDetail.comments.length})
          </h2>

          {threadDetail.comments.length === 0 ? (
            <div className="bg-pink-300 border-4 border-black shadow-[6px_6px_0_0_#000] p-6 text-center font-bold">
              Belum Ada Komen
            </div>
          ) : (
            <div className="space-y-4">
              {threadDetail.comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} threadId={id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailedThreadPage;
