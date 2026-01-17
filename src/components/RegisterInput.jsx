import React from "react";
import useInput from "../hooks/useInput";
import InputBox from "./InputBox";

const RegisterInput = ({ register }) => {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  return (
    <>
      <>
        <form className="bg-white border-4 border-black p-8 w-[350px] shadow-[8px_8px_0px_0px_#000]">
          <h2 className="text-3xl font-extrabold mb-6 border-b-4 border-black pb-2">
            Registrasi Dulu le
          </h2>
          \
          <InputBox
            change={onNameChange}
            input={name}
            displayName={"Nama"}
            type="text"
          />
          <InputBox
            change={onEmailChange}
            input={email}
            displayName={"Email"}
            type="email"
          />
          <InputBox
            change={onPasswordChange}
            input={email}
            type="password"
            displayName={"Password"}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 border-4 border-black shadow-[4px_4px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none"
            onClick={(e) => {
              e.preventDefault();
              register({ email, password, name });
            }}
          >
            GAS BIKIN
          </button>
        </form>
      </>
    </>
  );
};

export default RegisterInput;
