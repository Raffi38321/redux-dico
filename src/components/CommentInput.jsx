import { useState } from "react";
import { useDispatch } from "react-redux";
import { asyncAddComment } from "../states/threadDetail/action";

function CommentInput({ threadId }) {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      dispatch(asyncAddComment(threadId, content));
      setContent("");
    }
  };

  return (
    <div className="bg-white border-4 border-black shadow-[8px_8px_0_0_#000] p-6 mb-8 font-mono">
      <h3 className="text-xl font-extrabold mb-4">ADD COMMENT</h3>

      <form onSubmit={onSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Komenin le..."
          rows="4"
          required
          className="
            w-full p-4 
            border-4 border-black 
            resize-none 
            outline-none
            bg-[#fefefe]
            focus:bg-yellow-100
            focus:shadow-[4px_4px_0_0_#000]
            transition
          "
        />

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="
              px-6 py-3
              bg-blue-300
              border-4 border-black
              font-bold
              shadow-[4px_4px_0_0_#000]
              hover:-translate-x-1 hover:-translate-y-1
              hover:bg-blue-400
              active:translate-x-0 active:translate-y-0
              transition
            "
          >
            POST →
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentInput;
