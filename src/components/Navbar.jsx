const Navbar = () => {
  return (
    <div className=" max-w-screen-2xl  text-white">
      {/* Gradient Background */}
      <nav className="w-full flex justify-between items-center h-18 text-lg relative bg-slate-950 pt-2 px-6">
        <div className="  absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        <div className="pmLogo font-bold cursor-pointer text-sm sm:text-xl flex justify-center items-center">
          <span className="text-cyan-400">&lt;</span>
          <img src="icons/password.png" alt="site-logo"  className=" sm:w-12 w-6"/>
          Pass
          <span className="text-cyan-400">
            OP
            <span className="text-cyan-400 px-2">/&gt;</span>
          </span>
        </div>
        {/* <ul className="flex gap-4 z-10 mr-5 sm:mr-16 text-sm sm:text-xl">
          <li>
            <a href="/" className="hover:font-bold hover:text-cyan-300">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:font-bold hover:text-cyan-300">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:font-bold hover:text-cyan-300">
              Contact
            </a>
          </li>
        </ul> */}
        <button className="  z-10 cursor-pointer border-2 border-white self-center rounded-full px-4 py-1 bg-cyan-400 flex justify-center gap-1 items-center text-black font-bold hover:bg-cyan-300">
          <img src="icons/github-logo.png" alt="git-logo" className=" w-4 sm:w-6" />
          <span className=" text-xs md:text-sm">GitHub</span>
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
