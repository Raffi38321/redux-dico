import api from "../../utils/api";

const ActionType = {
  REGISTER_USER: "REGISTER_USER",
};

function registerUser(user) {
  return {
    type: ActionType.REGISTER_USER,
    payload: {
      user,
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

export { registerUser, asyncRegisterUser, ActionType };
