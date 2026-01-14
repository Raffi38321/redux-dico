import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./authUser/reducer";
import userReducer from "./users/reducer";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    users: userReducer,
  },
});

export default store;
