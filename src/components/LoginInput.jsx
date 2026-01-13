import React from "react";
import useInput from "../hooks/useInput";

const LoginInput = ({ onLogin }) => {
  const [email, onEmailChange] = useInput();
  const [password, onPasswordChange] = useInput();

  return (
    <>
      <form className="bg-white border-4 border-black p-8 w-[350px] shadow-[8px_8px_0px_0px_#000]">
        <h1 className="text-3xl font-extrabold mb-6 border-b-4 border-black pb-2">
          LOGIN
        </h1>

        <div className="mb-4">
          <label className="block font-bold mb-1">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={onEmailChange}
            className="w-full border-4 border-black px-3 py-2 focus:outline-none focus:bg-yellow-100"
          />
        </div>

        <div className="mb-6">
          <label className="block font-bold mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onPasswordChange}
            className="w-full border-4 border-black px-3 py-2 focus:outline-none focus:bg-yellow-100"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 border-4 border-black shadow-[4px_4px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none"
          onClick={(e) => {
            e.preventDefault();
            onLogin({ email, password });
          }}
        >
          GAS LOGIN
        </button>
      </form>
    </>
  );
};

export default LoginInput;
