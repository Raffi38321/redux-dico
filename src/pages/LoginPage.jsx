import React from 'react';
import LoginInput from '../components/LoginInput';
import FooterLoginRegister from '../components/FooterLoginRegister';
import {useDispatch} from 'react-redux';
import {asyncSetAuthUser} from '../states/authUser/action';
import {useNavigate} from 'react-router-dom';

const LoginPage = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const onLogin = ({password, email}) => {
    dispath(asyncSetAuthUser({email, password}));
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <LoginInput onLogin={onLogin} />

      <FooterLoginRegister
        p1={'Belum Punya Akun?'}
        p2={'JOM BIKIN'}
        link={'/register'}
      />
    </div>
  );
};

export default LoginPage;
