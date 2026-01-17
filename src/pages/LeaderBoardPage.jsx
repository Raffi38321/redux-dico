import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncSetLeaderBoards } from "../states/leaderBoards/action";
import UserCard from "../components/UserCard";

const LeaderBoardPage = () => {
  const { leaderBoards = [] } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncSetLeaderBoards());
  }, [dispatch]);

  return (
    <section className="w-full flex flex-col items-center gap-8">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold uppercase border-4 border-black px-6 py-2 bg-white shadow-[6px_6px_0_0_#000]">
          Leaderboards
        </h2>
        <p className="mt-2 font-bold tracking-wide">Top users by score</p>
      </div>

      <div className="flex flex-col gap-4 items-center">
        {leaderBoards.map((obj, index) => (
          <UserCard
            key={obj.user.id}
            user={obj.user}
            score={obj.score}
            rank={index + 1}
          />
        ))}
      </div>
    </section>
  );
};

export default LeaderBoardPage;
