import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./authUser/reducer";
import userReducer from "./users/reducer";
import threadsReducer from "./threads/reducer";
import isPreloadReducer from "./isPreload/reducer";
import leaderboardsReducer from "./leaderBoards/reducer";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    users: userReducer,
    threads: threadsReducer,
    isPreload: isPreloadReducer,
    leaderBoards: leaderboardsReducer,
  },
});

export default store;
