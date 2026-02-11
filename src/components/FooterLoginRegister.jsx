import React from 'react';
import {Link} from 'react-router-dom';

const FooterLoginRegister = ({p1, p2, link}) => {
  return (
    <p className="bg-white border-4 border-black px-4 py-2 font-bold shadow-[4px_4px_0px_0px_#000]">
      {p1}{' '}
      <Link
        to={link}
        className="underline underline-offset-4 hover:bg-black hover:text-white px-1"
      >
        {p2}
      </Link>
    </p>
  );
};

export default FooterLoginRegister;
