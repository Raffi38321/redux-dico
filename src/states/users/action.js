import api from "../../utils/api";

const ActionType = {
  REGISTER_USER: "REGISTER_USER",
};

function receiveUserFromApi(users) {
  return {
    type: ActionType.REGISTER_USER,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async () => {
    try {
      const res = await api.register({ name, email, password });
      console.log(res.data);
    } catch (error) {
      alert(error.message);
    }
  };
}

export { receiveUserFromApi, asyncRegisterUser, ActionType };
