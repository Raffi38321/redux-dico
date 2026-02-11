import {configureStore} from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import userReducer from './users/reducer';
import threadsReducer from './threads/reducer';
import isPreloadReducer from './isPreload/reducer';
import leaderboardsReducer from './leaderBoards/reducer';
import threadDetailReducer from './threadDetail/reducer';
import {loadingBarReducer} from '@dimasmds/react-redux-loading-bar';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    users: userReducer,
    threads: threadsReducer,
    isPreload: isPreloadReducer,
    leaderBoards: leaderboardsReducer,
    threadDetail: threadDetailReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
