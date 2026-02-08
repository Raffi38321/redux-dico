import React from "react";
import useInput from "../hooks/useInput";
import InputBox from "../components/InputBox";
import { useDispatch } from "react-redux";
import { asyncAddThread } from "../states/threads/action";
import { useNavigate } from "react-router-dom";

const CreateThreadsPage = () => {
  const [title, onTitleChange] = useInput();
  const [body, onBodyChange] = useInput();
  const [category, onCategoryChange] = useInput();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onPostingThread = (e) => {
    e.preventDefault();
    dispatch(asyncAddThread({ title, body, category }));
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <form className="bg-white border-4 border-black p-8 w-[350px] shadow-[8px_8px_0px_0px_#000]">
        <h2 className="text-3xl font-extrabold mb-6 border-b-4 border-black pb-2">
          Create Threads
        </h2>

        <InputBox displayName={"Title"} change={onTitleChange} input={title} />

        <InputBox displayName={"Body"} change={onBodyChange} input={body} />

        <InputBox
          displayName={"Category"}
          change={onCategoryChange}
          input={category}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 border-4 border-black shadow-[4px_4px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none"
          onClick={onPostingThread}
        >
          Posting
        </button>
      </form>
    </div>
  );
};

export default CreateThreadsPage;
