import React from "react";
import LoadingBar from "@dimasmds/react-redux-loading-bar";

const Loading = () => {
  return (
    <div className="sticky top-0 w-full z-[9999]">
      <LoadingBar />
    </div>
  );
};

export default Loading;
