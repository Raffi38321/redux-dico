import React from "react";
import RegisterInput from "../components/RegisterInput";
import FooterLoginRegister from "../components/FooterLoginRegister";
// import { useDispatch } from "react-redux";
// import { asyncRegisterUser } from "../states/users/action";

const RegisterPage = () => {
  // const dispath = useDispatch();
  const register = ({ email, password, name }) => {
    console.log("ini dari page", email, password, name);
    // dispath(asyncRegisterUser({ email, password, name }));
  };
  return (
    <div className="flex flex-col items-center justify-center gap-4">
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
