import React from 'react';
import useInput from '../hooks/useInput';
import InputBox from './InputBox';

const LoginInput = ({onLogin}) => {
  const [email, onEmailChange] = useInput();
  const [password, onPasswordChange] = useInput();

  return (
    <>
      <form className="bg-white border-4 border-black p-8 w-[350px] shadow-[8px_8px_0px_0px_#000]">
        <h2 className="text-3xl font-extrabold mb-6 border-b-4 border-black pb-2">
          LOGIN
        </h2>

        <InputBox
          displayName={'Email'}
          input={email}
          change={onEmailChange}
          type="email"
        />

        <InputBox
          displayName={'Password'}
          change={onPasswordChange}
          input={password}
          type="password"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 border-4 border-black shadow-[4px_4px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none"
          onClick={(e) => {
            e.preventDefault();
            onLogin({email, password});
          }}
        >
          GAS LOGIN
        </button>
      </form>
    </>
  );
};

export default LoginInput;
