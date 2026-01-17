import api from "../../utils/api";

const ActionType = {
  RECEIVE_USERS: "RECEIVE_USERS",
};

function receiveUserFromApi(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async () => {
    try {
      await api.register({ name, email, password });
    } catch (error) {
      alert(error.message);
    }
  };
}

export { receiveUserFromApi, ActionType, asyncRegisterUser };
