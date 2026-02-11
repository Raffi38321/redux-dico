import React from 'react';
import {FaPlusCircle} from 'react-icons/fa';
import {IoHome} from 'react-icons/io5';
import {PiRankingThin} from 'react-icons/pi';
import {Link, useLocation} from 'react-router-dom';

const Footer = () => {
  const {pathname} = useLocation();

  const itemStyle = (active) =>
    `
    flex flex-col items-center justify-center
    w-14 h-14
    border-2 border-black
    shadow-[3px_3px_0_0_#000]
    transition-all
    active:translate-x-[2px] active:translate-y-[2px]
    active:shadow-none
    ${active ? 'bg-black text-white' : 'bg-[#FFD36A]'}
  `;

  return (
    <footer className="sticky bottom-0 z-50">
      <div className="flex items-center justify-center gap-16 px-6 py-4 bg-[#FFA240] ">
        <Link to="/" className={itemStyle(pathname === '/')}>
          <IoHome className="text-xl" />
          <span className="text-[10px] font-bold">Home</span>
        </Link>

        <Link
          to="/leaderboards"
          className={itemStyle(pathname === '/leaderboards')}
        >
          <PiRankingThin className="text-2xl" />
          <span className="text-[10px] font-bold">Rank</span>
        </Link>

        <Link
          to="/create-thread"
          className={itemStyle(pathname === '/create-thread')}
        >
          <FaPlusCircle className="text-2xl" />
          <span className="text-[10px] font-bold">Create</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
