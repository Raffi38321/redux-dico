import api from '../../utils/api';
import {setAuthUser} from '../authUser/action';
import {hideLoading, showLoading} from '@dimasmds/react-redux-loading-bar';
const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const authUser = await api.getProfile();
      dispatch(setAuthUser(authUser));
    } catch (error) {
      console.log(error);
      dispatch(setAuthUser(null));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }
    dispatch(hideLoading());
  };
}

export {ActionType, setIsPreloadActionCreator, asyncPreloadProcess};
