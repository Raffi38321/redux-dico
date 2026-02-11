import React from 'react';
import {Link} from 'react-router-dom';
import postedAt from '../utils/dateFormat.js';
import {
  HiOutlineChatAlt2,
  HiOutlineThumbUp,
  HiOutlineThumbDown,
} from 'react-icons/hi';
import {useDispatch, useSelector} from 'react-redux';
import {
  asyncDownVoteThread,
  asyncUpVoteThread,
  asyncNeutralVoteThread,
} from '../states/threads/action';

const ThreadCard = ({thread}) => {
  const {
    id,
    title,
    body,
    createdAt,
    upVotesBy,
    downVotesBy,
    totalComments,
    user,
  } = thread;

  const dispatch = useDispatch();
  const {authUser} = useSelector((states) => states);
  const date = postedAt(createdAt);
  const isUpVoted = upVotesBy.includes(authUser.id);
  const isDownVoted = downVotesBy.includes(authUser.id);

  const onUpVote = () => {
    if (isUpVoted) {
      dispatch(asyncNeutralVoteThread(id));
    } else {
      dispatch(asyncUpVoteThread(id));
    }
  };

  const onDownVote = () => {
    if (isDownVoted) {
      dispatch(asyncNeutralVoteThread(id));
    } else {
      dispatch(asyncDownVoteThread(id));
    }
  };

  return (
    <article className="p-5 bg-white border-4 border-black shadow-[6px_6px_0_0_#000] mt-10">
      <Link
        to={`/threads/${id}`}
        className="block text-xl font-extrabold uppercase mb-2 hover:underline"
      >
        {title}
      </Link>

      <p className="text-sm mb-4 line-clamp-2">{body}</p>

      <div className="flex items-center text-sm font-bold gap-6">
        <span className="uppercase text-gray-700">{date}</span>
        <span className="uppercase text-black-700">
          Dibuat Oleh {user.name}
        </span>
        <div className="flex items-center gap-4">
          <button
            onClick={onUpVote}
            className={`
                         flex items-center gap-2 px-3 py-1
                         border-4 border-black font-bold
                         shadow-[3px_3px_0_0_#000]
                         transition
                         ${isUpVoted ? 'bg-red-600' : 'bg-white hover:bg-green-200'}
                       `}
          >
            <HiOutlineThumbUp className="text-lg" /> {upVotesBy.length}
          </button>

          <button
            onClick={onDownVote}
            className={`
                flex items-center gap-2 px-3 py-1
                border-4 border-black font-bold
                shadow-[3px_3px_0_0_#000]
                transition
                ${isDownVoted ? 'bg-red-600' : 'bg-white hover:bg-red-200'}
              `}
          >
            <HiOutlineThumbDown className="text-lg" /> {downVotesBy.length}
          </button>

          <div className="flex items-center gap-1">
            <HiOutlineChatAlt2 className="text-lg" />
            <span>{totalComments}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ThreadCard;
