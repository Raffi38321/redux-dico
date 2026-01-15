import api from "../../utils/api";

const actionType = {
  RECEIVE_THREADS: "RECEIVE_THREADS",
  CREATE_THREADS: "CREATE_THREADS",
};

function receiveThreadsFromApi(threads) {
  return {
    type: actionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadCreator(thread) {
  return {
    type: actionType.CREATE_THREADS,
    payload: {
      thread,
    },
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadCreator(thread));
      console.log(thread);
    } catch (error) {
      alert(error.message);
    }
  };
}
export { asyncAddThread, receiveThreadsFromApi, actionType, addThreadCreator };
