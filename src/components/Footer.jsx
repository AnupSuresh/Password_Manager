// import React from 'react'

const Footer = () => {
  return (
    <div className=" text-white border-b-2 border-x-2 rounded-br-lg rounded-bl-lg border-cyan-400 text-center fixed bottom-0 w-full p-3 font-bold">
      <div className="pmLogo font-bold cursor-pointer text-xl flex justify-center items-center">
        <span className="text-cyan-400">&lt;</span>
        <img src="icons/password.png" alt="site-logo" width={45} />
        Pass
        <span className="text-cyan-400">
          OP
          <span className="text-cyan-400 px-2">/&gt;</span>
        </span>
      </div>
      Creater With &#10084; by me and Inspired by CodeWithHarry.
    </div>
  );
};

export default Footer;
