import React from 'react';

const UserCard = ({user, score}) => {
  const {name, avatar} = user;

  return (
    <div
      className="
        w-[360px]
        flex items-center justify-between
        gap-4 p-4
        bg-white
        border-4 border-black
        shadow-[6px_6px_0_0_#000]
      "
    >
      <div className="flex items-center gap-3">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 border-4 border-black object-cover bg-white"
        />

        <p className="font-extrabold uppercase truncate max-w-[120px]">
          {name}
        </p>
      </div>

      <div className="min-w-[64px] text-center px-3 py-1 bg-pink-600 border-4 border-black font-extrabold text-white">
        {score}
      </div>
    </div>
  );
};

export default UserCard;
