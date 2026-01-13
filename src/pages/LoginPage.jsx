import React from "react";
import LoginInput from "../components/LoginInput";
import FooterLoginRegister from "../components/FooterLoginRegister";
import { useDispatch } from "react-redux";
import { asyncSetAuthUser } from "../states/authUser/action";

const LoginPage = () => {
  const dispath = useDispatch();
  const onLogin = ({ password, email }) => {
    dispath(asyncSetAuthUser({ email, password }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-300 gap-4">
      <LoginInput onLogin={onLogin} />

      <FooterLoginRegister
        p1={"Belum Punya Akun?"}
        p2={"JOM BIKIN"}
        link={"/register"}
      />
    </div>
  );
};

export default LoginPage;
