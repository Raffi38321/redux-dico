import api from "../../utils/api";
import { receiveThreadsFromApi } from "../threads/action";
import { receiveUserFromApi } from "../users/action";

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      dispatch(receiveUserFromApi(users));
      dispatch(receiveThreadsFromApi(threads));
    } catch (error) {
      alert(error.message);
    }
  };
}

export { asyncPopulateUsersAndThreads };
