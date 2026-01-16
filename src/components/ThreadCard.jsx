import React from "react";
import { Link } from "react-router-dom";
import { postedAt } from "../utils/dateFormat";
import {
  HiOutlineChatAlt2,
  HiOutlineThumbUp,
  HiOutlineThumbDown,
} from "react-icons/hi";

const ThreadCard = ({ thread }) => {
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

  const date = postedAt(createdAt);

  return (
    <article className="p-5 bg-white border-4 border-black shadow-[6px_6px_0_0_#000]">
      {/* Title */}
      <Link
        to={`/threads/${id}`}
        className="block text-xl font-extrabold uppercase mb-2 hover:underline"
      >
        {title}
      </Link>

      {/* Body */}
      <p className="text-sm mb-4 line-clamp-3">{body}</p>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm font-bold">
        {/* Meta */}
        <span className="uppercase text-gray-700">{date}</span>
        <span className="uppercase text-gray-700">{user.name}</span>
        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Upvote */}
          <div className="flex items-center gap-1">
            <HiOutlineThumbUp className="text-lg" />
            <span>{upVotesBy.length}</span>
          </div>

          {/* Downvote */}
          <div className="flex items-center gap-1">
            <HiOutlineThumbDown className="text-lg" />
            <span>{downVotesBy.length}</span>
          </div>

          {/* Comments */}
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
