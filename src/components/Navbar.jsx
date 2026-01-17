import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ authUser, signOut }) => {
  const { avatar, name } = authUser;

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[#FFA240]  sticky top-0">
      <h2 className="text-2xl font-black tracking-wide uppercase">
        Forum Diskusi
      </h2>

      <div className="flex items-center gap-3">
        <img
          src={avatar}
          alt="ini avatar"
          title={name}
          className="w-10 h-10 border-4 border-black object-cover"
        />

        <button
          type="button"
          onClick={signOut}
          className="px-4 py-2 bg-pink-600 text-white border-4 border-black font-extrabold uppercase shadow-[4px_4px_0_0_#000] transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default Navbar;
