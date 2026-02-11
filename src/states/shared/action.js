import api from '../../utils/api';
import {receiveThreadsFromApi} from '../threads/action';
import {receiveUserFromApi} from '../users/action';
import {hideLoading, showLoading} from '@dimasmds/react-redux-loading-bar';
function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      dispatch(receiveUserFromApi(users));
      dispatch(receiveThreadsFromApi(threads));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export {asyncPopulateUsersAndThreads};
