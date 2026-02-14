import React from 'react';

const TagCard = ({tag, handleFilterTag}) => {
  const onFilterTag = () => {
    handleFilterTag({text: tag});
  };

  return (
    <p
      className="p-5 bg-white border-4 border-black shadow-[6px_6px_0_0_#000] font-bold"
      onClick={onFilterTag}
    >
      #{tag}
    </p>
  );
};

export default TagCard;
