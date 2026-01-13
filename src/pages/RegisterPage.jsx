import React from "react";
import RegisterInput from "../components/RegisterInput";
import FooterLoginRegister from "../components/FooterLoginRegister";

const RegisterPage = () => {
  const register = ({ email, password, name }) => {
    console.log(email, password, name);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-300 gap-4">
      <RegisterInput register={register} />
      <FooterLoginRegister
        p1={"Dah Punya Akun?"}
        p2={"LESGO LOGIN"}
        link={"/login"}
      />
    </div>
  );
};

export default RegisterPage;
